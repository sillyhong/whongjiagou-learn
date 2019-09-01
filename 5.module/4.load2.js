//let load1 = require('./load3');
//先的当前目录下的
// load3->load3.js->load3.json->load3.node
// ->load3文件夹
//let load1 = require('c:/load.js');
//--------------------
let load2 = require('load');
console.log(load2);
//当前模块的查找路径 全局的模块路径
//会找到module.paths global module
//console.log(module.paths);
/**
 [
 'D:\\vipcode\\201801\\5.module\\node_modules',
 'D:\\vipcode\\201801\\node_modules',
 'D:\\vipcode\\node_modules',
 'D:\\node_modules' ]
 环境变量中的NODE_PATH指向的目录
 **/