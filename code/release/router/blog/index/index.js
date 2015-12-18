'use strict'

const router = require('koa-router')();
const tmpKey = 'blog-index'

var indexFn = function (ctx, next) {
    // ctx.body = 'hello docker'
    ctx.render(tmpKey,'index.html',{
      title:'Hello JinC & L',
      renderTime: '' + new Date
    })
  }
router
  .get('/index.html',indexFn)
  .get('/',indexFn)

module.exports = router