'use strict'

const fs = require('fs')
const path = require('path')


class Templates {
  constructor (key,viewDir){
    let _vD = path.resolve(__dirname,'../',viewDir)
    let dirs = fs.readdirSync(_vD)
    let views ={}
    let tmpPath = {}
    dirs.map((file,i) => {
      let _path = path.resolve(_vD,file)
      console.log(_path)
      let data = fs.readFileSync(_path)
      views[file] = '' + data
      tmpPath[file] = _path
    })
    this.views = views
    this.key = key
    this.path = tmpPath
    return this
  }
  
}
module.exports = Templates