
try {
    setTimeout(function () {
        throw Error('异步错误');
    }, 1000);
} catch (e) {
    console.log('catch ', e);
}
console.log('2');
setTimeout(function () {
    console.log(5);
}, 5000);
//在node.js中，如果出现未捕获的异常的话，则会交会uncaughtException
//但是永远不要用。这种方式有可能会引起内存泄露等问题
process.on('uncaughtException', function () {
    console.log('uncaughtException');
});