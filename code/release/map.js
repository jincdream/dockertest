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
        "dev/blog/index/view/index.html": {
            "uri": "/view/blog/index/index.html",
            "type": "html"
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
      routers.push(path.join('./code/release',uri))
      break;
    case 'view':
      let viewDirPath = path.join('./code/release',uri,'../')

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