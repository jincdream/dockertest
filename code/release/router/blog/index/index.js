'use strict'

const router = require('koa-router')({
  prefix: '/index'
});
const tmpKey = 'blog-index'
router
  .get('/', function (ctx, next) {
    // ctx.body = 'hello docker'
    ctx.render(tmpKey,'index.html',{
      title:'Hello JinC & L',
      renderTime: '' + new Date
    })
  })

module.exports = router