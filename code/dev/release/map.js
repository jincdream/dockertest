'use strict'
const MAP  = {
    "res": {
        "dev/blog/index/router/index.js": {
            "uri": "/router/blog/index/index.js",
            "type": "js",
            "deps": [
                "koa-router"
            ]
        },
        "dev/blog/index/static/css/a.scss": {
            "uri": "/public/blog/index/a.css",
            "type": "css",
            "extras": {}
        },
        "dev/blog/index/static/img/p.png": {
            "uri": "/public/blog/index/p.png",
            "type": "png"
        },
        "dev/blog/index/static/lib/main.js": {
            "uri": "/public/blog/index/main.js",
            "type": "js"
        },
        "dev/blog/index/view/aaaa.html": {
            "uri": "/view/blog/index/aaaa.html",
            "type": "html"
        },
        "dev/blog/index/view/index.html": {
            "uri": "/view/blog/index/index.html",
            "type": "html"
        },
        "dev/release/map.js": {
            "uri": "/dev/release/map.js",
            "type": "js",
            "deps": [
                "path"
            ]
        },
        "dev/release/public/blog/index/a.css": {
            "uri": "/dev/release/public/blog/index/a.css",
            "type": "css"
        },
        "dev/release/public/blog/index/main.js": {
            "uri": "/dev/release/public/blog/index/main.js",
            "type": "js"
        },
        "dev/release/router/blog/index/index.js": {
            "uri": "/dev/release/router/blog/index/index.js",
            "type": "js",
            "deps": [
                "koa-router"
            ]
        }
    },
    "pkg": {}
}
const path = require('path')

var res         = MAP.res
var routers     = []
var views       = []
var viewsObj    = []
exports.routers = routers
exports.views   = viewsObj

Object.keys(res).map((name,i,map) => {
  let fileObj = res[name]
  let uri = fileObj.uri
  let [x,type,keyA,keyB,page] = uri.split('/')

  switch(type){
    case 'router':
    console.log(path.resolve(__dirname,'.'+uri),'router')
      routers.push(path.resolve(__dirname,'.'+uri))
      break;
    case 'view':
    console.log(__dirname)
      let viewDirPath = path.resolve(__dirname,'.'+uri,'../')

      if(!~views.indexOf(viewDirPath)){
        views.push(viewDirPath)
        viewsObj.push({
          key: `${keyA}-${keyB}`,
          path: viewDirPath
        })
      }
      break;
    default:
      break;
  }
})