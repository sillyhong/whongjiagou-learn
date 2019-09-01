let { AsyncParallelHook } = require('tapable');
let queue = new AsyncParallelHook(['name']);
// console.time('cost');
// queue.tap('1', function (name) {
//     console.log(name, 1);
// });
// queue.tap('2', function (name) {
//     console.log(name, 2);
// });
// queue.tap('3', function (name) {
//     console.log(name, 3);
// });
// queue.callAsync('zfpx', err => {
//     console.log(err);
//     console.timeEnd('cost');
// });

// console.time('cost');
// queue.tapAsync('1', function (name, cb) {
//     setTimeout(function () {
//         console.log(name, 1);
//         cb();
//     },1000);
// });
// queue.tapAsync('2', function (name, cb) {
//     setTimeout(function () {
//         console.log(name, 2);
//         cb();
//     },2000);
// });
// queue.tapAsync('3', function (name, cb) {

//     setTimeout(function () {
//         console.log(name, 3);
//         cb();
//     },3000);
// });
// queue.callAsync('zfpx', err => {
//     console.log(err);
//     console.timeEnd('cost');
// });

console.time('cost');
queue.tapPromise('1', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(name, 1);
            reject('a');
        }, 1000);
    });
});
queue.tapPromise('2', function (name, cb) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(name, 2);
            resolve('b');
        }, 2000);
    });
});
queue.tapPromise('3', function (name, cb) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            console.log(name, 3);
            resolve('c');
        }, 3000);
    });
});
queue.promise('zfpx').then(data => {
    console.log(data);
    console.timeEnd('cost');
}, err => {
    console.error(err);
});