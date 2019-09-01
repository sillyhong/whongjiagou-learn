//let { SyncLoopHook } = require('tapable');

class SyncLoopHook {
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

//上一个函数的返回值可以传给下一个函数
let queue = new SyncLoopHook(['name']);
let count1 = 3;
//loop循环的意思，当一事件发生的触发的时候，监听函数会反复执行。当监听函数返回true表示继续循环，返回false表示不再循环了
queue.tap('1', function (name) {
    console.log(1, name, count1--);
    if (count1) {
        return true;
    } else {
        return;
    }
});
queue.call('zfpx');//call的意思就是调用的意思，也就是触发事件的意思