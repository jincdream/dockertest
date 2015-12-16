'use strict'
// var http = require('http');
// http.createServer(function(req,res){
//   res.end('docker webhook')
//   console.log('co')
// }).listen('8099')
const CODE_DIR    = './code'

const path        = require('path')
const fs          = require('mz/fs')

const Koa         = require('koa')
const convert     = require('koa-convert')
const staticCache = require('koa-static-cache')
const bodyParser  = require('koa-bodyparser')
const compress    = require('koa-compress')

const Handlebars  = require('handlebars')

const map         = require(`${CODE_DIR}/release/map.js`)
const Templates   = require('./tmp')

var tmps          = {}
var app           = new Koa()
var _use          = app.use

/* 1.* -> 2.* */
app.use = x => _use.call(app, convert(x))

/* compress */
app.use(compress({
  filter: function (content_type) {
    return /text/i.test(content_type)
  },
  threshold: 2048,
  flush: require('zlib').Z_SYNC_FLUSH
}))

/* views */
map.views.forEach((viewObj,i) => {
  let {key,path} = viewObj
  tmps[key]      = new Templates(key,path)
})
app.context.myTemps = tmps
app.context.render  = function(key,view,data){
  let ctx     = this
  let tmps    = ctx.myTemps[key]
  let content = app.env !== 'dev' ? tmps.views[view] : (''+fs.readFileSync(tmps.path[view]));
  if(content){
    ctx.body  = Handlebars.compile(content)(data||{})
  }else{
    console.log(tmps)
    console.error(`not find ${view} at ${key}`)
    ctx.status = 404
    throw `not find ${view} at ${key}`
  }
}

/* error */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // some errors will have .status
    // however this is not a guarantee
    ctx.status = err.status || 500;
    ctx.type = 'html';
    ctx.body = '<p>Something <em>exploded</em>, please contact JinC.</p>';
    // since we handled this manually we'll
    // want to delegate to the regular app
    // level error handling as well so that
    // centralized still functions correctly.
    ctx.app.emit('error', err, ctx);
  }
});


// error handler

app.on('error', (err) => {
  if (process.env.NODE_ENV != 'test') {
    console.log('sent error %s to the cloud', err.message);
    console.log(err);
  }
});

/*
  body-parser 
  https://github.com/koajs/bodyparser
*/
app.use(bodyParser())

/*
 combine url
*/
app.use(async (ctx, next) => {
  let req = ctx.request
  let qs  = req.querystring
  console.log()
  if(qs.indexOf('?') === 0){

  }
  await next()
})

/*
  static
  https://github.com/koajs/static-cache
*/
console.log(path.join(__dirname, `${CODE_DIR}/release/public`))
app.use(staticCache(path.join(__dirname, `${CODE_DIR}/release/public`),{
  prefix:'/public',
  maxAge: 0
}))

/* router */
map.routers.forEach((router,i) => {
  let _router = require(`./${router}`)
  app.use(_router.routes())
})

app.listen(8099);






