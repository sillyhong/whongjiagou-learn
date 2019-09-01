const debug = require('./debug');
//此模块是用来写日志的
let loggerA = debug('juejin:a');
loggerA('a1', 'a2');
let loggerB = debug('juejin:b');
loggerB('b1', 'b2');
//console.log语句的输出不管如何都会输出
//有些时候我们希望有些语句开发的时候输出，上线的时候不输出
//console.log('hello');
//我们可以通过修改环境变量来控制输出
// window SET DEBUG=xxx
//mac linux   export DEBUG=xxx
