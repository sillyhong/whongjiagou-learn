//let { SyncWaterfallHook } = require('tapable');

class SyncWaterfallHook {
    constructor() {
        this.hooks = [];
    }
    tap(name, fn) {
        this.hooks.push(fn);
    }
    call() {
        let result;
        for (let i = 0; i < this.hooks.length; i++) {
            let hook = this.hooks[i];
            result = i == 0 ? hook(...arguments) : hook(result);
        }
    }
}

//上一个函数的返回值可以传给下一个函数
let queue = new SyncWaterfallHook(['name']);
//注册监听函数
queue.tap('1', function (name) {
    console.log(name, 1);
    return '1';
});
queue.tap('2', function (data) {
    console.log(data, 2);
    return "2"
});
queue.tap('3', function (data) {
    console.log(data, 3);
});
queue.call('zfpx');//call的意思就是调用的意思，也就是触发事件的意思