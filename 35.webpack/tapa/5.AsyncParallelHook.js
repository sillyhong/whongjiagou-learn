let { AsyncParallelHook } = require('tapable');
/**
class AsyncParallelHook {
    constructor() {
        this.hook;
    }
    tap(name, fn) {
        this.hook = fn;
    }
    call() {
        let result;
        do {
            result = this.hook(...arguments);
        } while (result);
    }
}
 */
//上一个函数的返回值可以传给下一个函数
let queue = new AsyncParallelHook(['name']);
/** 
console.time('cost');
//异步并发执行
queue.tap('1', function (name) {
    console.log(1, name);
});
queue.tap('2', function (name) {
    console.log(2, name);
});
queue.tap('3', function (name) {
    console.log(3, name);
});
//如果是异步 的设没有call方法了
queue.callAsync('zfpx', () => {
    console.log('over');
});//call的意思就是调用的意思，也就是触发事件的意思
**/

/**
console.time('cost');
//异步并发执行
queue.tapAsync('1', function (name, cb) {
    setTimeout(function () {
        console.log(1, name);
        cb();
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
//如果是异步 的设没有call方法了
queue.callAsync('zfpx', () => {
    console.log('over');
    console.timeEnd('cost');
});//call的意思就是调用的意思，也就是触发事件的意思
**/


console.time('cost');
//异步并发执行
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(1, name);
            resolve();
        }, 1000);
    });
});
queue.tapPromise('2', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(2, name);
            resolve();
        }, 2000);
    });


});
queue.tapPromise('3', function (name, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(3, name);
            resolve();
        }, 3000);
    });


});
/**
//如果是异步 的设没有call方法了
queue.callAsync('zfpx', () => {
    console.log('over');
    console.timeEnd('cost');
});//call的意思就是调用的意思，也就是触发事件的意思
 */
queue.promise('zfpx').then(() => {
    console.log('ok');
    console.timeEnd('cost');
}, () => {
    console.log('error');
    console.timeEnd('cost');
});