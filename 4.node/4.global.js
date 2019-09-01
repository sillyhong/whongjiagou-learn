/**
 * global全局对象
 * windows里也有全局对象，但是不能直接访问，我们在浏览器里访问global是通过window实现的
 * 1. global的变量都是全局变量
 * 2. 所有的全局变量都是global的属性
 * console
 * process 当前进程
 * chdir
 * cwd
 * nextTick
 * stdout stderr stdin
 * Buffer
 * clearImmediate clearInterval  clearTimeout
 * setImmediate setInterval setTimeout
 **/
//argv 如何写一个vue-cli脚手架
//chdir cwd memoryUsage
//console.log(process);
//change direcotry 改变当前的工作目录
// cwd current working directory 当前工作目录
console.log(process.cwd());
process.chdir('..');//切换到上级目录
console.log(process.cwd());
/**
 *V8引擎最大使用内存量是1.7个G
 * rss: 20512768, 常驻内存
  heapTotal: 8388608, 堆内存的总申请量
  heapUsed: 4338520,//已经使用的量
  external: 8224 }  //外部内存的使用量
 */
console.log(process.memoryUsage());