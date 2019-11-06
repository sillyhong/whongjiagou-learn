//let { AsyncSeriesHook } = require('tapable');
class AsyncSeriesHook {
    constructor() {
        this.hooks = [];
    }
    tapAsync(name, fn) {
        this.hooks.push(fn);
    }
    callAsync() {
        let args = Array.from(arguments);
        let done = args.pop();
        let idx = 0;
        let that = this;
        function next(err) {
            if (err) return done();
            let fn = that.hooks[idx++];
            fn ? fn(...args, next) : done();
        }
        next();
    }
}
//异步串行执行
let queue = new AsyncSeriesHook(['name']);
console.time('cost');
queue.tapAsync('1', function (name, cb) {
    setTimeout(function () {
        console.log(1, name);
        // cb('')
        cb('Wrong');//后面停止执行
    }, 1000);
});
queue.tapAsync('2', function (name, cb) {
    setTimeout(function () {
        console.log(2, name);
        cb();
    }, 2000);
});
queue.tapAsync('3', function (name, cb) {
    setTimeout(function () {
        console.log(3, name);
        cb();
    }, 3000);
});
queue.callAsync('zfpx', () => {
    console.timeEnd('cost');
});
