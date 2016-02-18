fis.set("project.ignore",["node_modules/**", "release/**", "fis-conf.js" , ".svn/**", ".git/**" ,"source/**","**/.svn"])

'use strict'
const deploy = [fis.plugin('local-deliver',{to: 'release/'})]

fis
.match('*',{
  useHash: !1
})
.match('/dev/(**)/(**)/view/(*).html',{
  release: 'view/$1/$2/$3.html',
  useMap:!0,
  deploy:deploy,
  useHash: false
})
.match('/dev/(**)/(**)/static/lib/(*).js',{
  deploy:deploy,
  useMap:!0,
  release: 'public/$1/$2/$3.js'
})
.match(/\/dev\/(.*?)\/(.*?)\/static\/img\/(.*?)\.((?:png|jpg|gif))/,{
  deploy:deploy,
  useMap:!0,
  release: 'public/$1/$2/$3.$4'
})
.match('/dev/(**)/(**)/static/css/(*).css',{
  deploy:deploy,
  useMap:!0,
  release: 'public/$1/$2/$3.css'
})
.match('/dev/(**)/(**)/static/css/(*).less', {
  parser: fis.plugin('less'),
  rExt: '.css',
  deploy:deploy,
  useMap:!0,
  release: 'public/$1/$2/$3.css'
})
.match('/dev/(**)/(**)/static/css/(*).{scss,sass}', {
  parser: fis.plugin('sass2'),
  rExt: '.css',
  deploy:deploy,
  useMap:!0,
  release: 'public/$1/$2/$3.css'
})
.hook('module', {
  mode: 'amd'
})
.match('*.png', {
  optimizer: fis.plugin('png-compressor'),
  useSpriter: true
})
.match('*.{scss,sass,less,css}', {
  useSpriter: true
})


fis
.match('/dev/(*)/(*)/router/(*).js',{
  deploy:deploy,
  release: 'router/$1/$2/$3.js',
  useHash: !1,
  useMap: !0,
  router: !0
})

fis
.match('/dev/map.js',{
  deploy:deploy,
  useHash: !1,
  useMap:!1,
  release:'map.js'
})
