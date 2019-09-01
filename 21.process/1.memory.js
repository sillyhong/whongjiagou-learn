/**
 * process.memoryUsage()
 */
let s = process.memoryUsage();
console.log(s);
let buf = Buffer.alloc(1024 * 1024 * 1024);
/**
 * node v8引擎内存使用量是有上限的，32位里最多是.7G  64位最多是1.7G
 *
  rss: 21110784,
  heapTotal: 7159808,
  heapUsed: 4351880,
  external: 8224 } buffer的内存是单独分配的，属于external
 */
s = process.memoryUsage();
//console.log(s);
// v8 的内存垃圾收集(标记清除法，计数垃圾收集法) 内存快照分析 内存泄露排查

//node一般不是很健壮 处理错误非常重要
setTimeout(function () {
    console.log('hello');
}, 3000);

//专门用来捕获未处理的异常
//有可能引起内存泄露等内容
process.on('uncaughtException', function () {
    console.log('uncaughtException');
});

//try {
//nomethod();
    ////} catch (e) {
    //console.error(e);
    //}