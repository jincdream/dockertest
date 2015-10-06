'use strict'
var http = require('http');
http.createServer(function(req,res){
  res.end('docker')
}).listen('8099')
