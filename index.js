'use strict'
var http = require('http');
http.createServer(function(req,res){
  res.end('docker')
  console.log('co')
}).listen('8099')
