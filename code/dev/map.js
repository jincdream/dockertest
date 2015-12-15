'use strict'
const MAP  = __RESOURCE_MAP__
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