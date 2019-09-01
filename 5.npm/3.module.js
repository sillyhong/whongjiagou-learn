/*
let obj = require('./a.js');
let obj = require('../a.js');
*/
//文件模块缓存和原生模块缓存不在一个地方
//require.cache是文件模块缓存
let f = require('fs');
console.log(require.cache);

let mime = require('mime');
console.log(mime.getType('a.jpg'));
//npm 2 3  是内嵌式的,从npm4改变了。
//1.window下文件夹的深 度是有限制
