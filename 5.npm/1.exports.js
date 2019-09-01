/**
 * 老师module.exports跟exports有啥区别初始化都是一个{}，指向的是同一个引用，分别是在什么场景下用到
 * 模块
 * vm.js module.js
 * 1. 在node.js 任何一个文件都是一个模块
 *   1.找到这个文件
 *   2. 读取文件内容
 *   3. 把文件内容封装在一个函数内部
 *   4. 创建此文件的module实例
 *   5. 准备好五个参数(exports,require,module,__dirname,__filename)
 *   6. 开始执行这个函数，并且把执行后的module.exports 返回给调用方
 */
//console.log(module);
/**
 * 1. 当你需要导出一个引用类型的数据的话，就只能用module.exports
 * 2. 当你只需要向导出对象上挂载属性的话中，两个都可以用
 *
 */
//exports == module.exports
//exports.name = 'zfpx';
module.exports  = function(){
  console.log(1)
}

