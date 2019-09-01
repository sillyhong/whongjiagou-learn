//把标准输出流输出到文件  1
console.log(1);
console.info(1);

//错误输出 2
//把错误输出2重定向到标准输出1中
//node 3.console.js 1> a.log 2>&1
console.warn(2);
console.error(2);
//用来统计二段代码之间执行时间的
console.time('cost');
let i=0;
while(i++<10000000){

}
//No such label 'cost' for console.timeEnd()
console.timeEnd('cost');//输出时间差
//高手进阶的非常重要标志就写代码会有完善的测试，包括单元测试 集成测试 持续集成 TDD 测试驱动开发 BDD 行为驱动开发
//以后会让大家造轮子，写开源项目，写项目的时候要严格按照开源的项目规范来做，其中一个就是要有严格的单元测试
//CMMI5级水平
//断言
//如果表达式表达为真的话就什么也不发生。
//如果表达式结果为假的话会报错 nagios 监控服务器的
function sum(a,b){
  return a+b;
}
//断言
console.assert(sum(1,2)==3,'报错');

let a = {name:'zfpx',home:{name:'北京'}};
//可以列出对象的结构
console.dir(global);
//跟踪当前代码的调用栈
console.trace();
/**
 * 程序执行从上往下执行
 * 栈是先进后出的
 * Trace
 at Object.<anonymous> (D:\vipcode\201801\4.node\3.console.js:34:9)
 at Module._compile (module.js:624:30)
 at Object.Module._extensions..js (module.js:635:10)
 at Module.load (module.js:545:32)
 at tryModuleLoad (module.js:508:12)
 at Function.Module._load (module.js:500:3)
 at Function.Module.runMain (module.js:665:10)
 at startup (bootstrap_node.js:201:16)
 at bootstrap_node.js:626:3
 **/