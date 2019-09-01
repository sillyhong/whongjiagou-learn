
/*
 id: '.', //模块ID 入口模块的ID永远为.
 exports: {},//导出对象，默认是一个空对象
 parent: null,//父模块 此模块是谁哪个模块来加载的
 //当前模块的绝对路径
 filename: 'D:\\vipcode\\201801\\5.module\\useschool.js',
 //是否加载完成
 loaded: false,
 children: [],//此模块加载了哪些模块
 paths: 第三方模块的查找路径
 */
/**
 * 在node.js里通过require方法加载其它模块
 * 这个加载是同步的
 * 1. 找到这个文件
 * 2. 读取此文件模块的内容
 * 3. 把它封装在一个函数里立刻执行
 * 4. 执行后把模块的module.exports对象赋给school
 */
/**
 * 因为模块实现缓存，当第一次加载一个模块之后，会缓存这个模块的exports对象。以后如果再次加载这个模块的话，则直接从缓存中取，不需要再次加载了
 * 缓存的key是什么？
 */
console.log(require);
/**
 * resolve
 * main
 * extensions
 * cache
 *
 */
//当你想知道一个模块的绝对路径的时候，但又不想真正加载它的时候，可以用resolve
console.log(Object.keys(require.cache));
var school = require('./school');
console.log(Object.keys(require.cache));
var school = require('./school');
console.log(Object.keys(require.cache));
//console.log(module);
/*!function(exports, require, module, __filename, __dirname){
  let name = 'zfpx';
  let age = 9;
  module.exports = {name,age};
  return module.exports;
}()
debugger;*/
console.log(school);