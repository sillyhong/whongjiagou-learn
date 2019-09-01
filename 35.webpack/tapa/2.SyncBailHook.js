//let { SyncBailHook } = require('tapable');
class SyncBailHook {
    constructor() {
        this.hooks = [];
    }
    tap(name, fn) {
        this.hooks.push(fn);
    }
    call() {
        for (let i = 0; i < this.hooks.length; i++) {
            let hook = this.hooks[i];
            let result = hook(...arguments);
            if (result)
                break;
        }
    }
}
//events EventEmitter
//当触发此事件时候需要传入name参数，然后监听函数可以获取name参数
let queue = new SyncBailHook(['name', 'age']);
//注册监听函数
queue.tap('1', function (name, age) {
    console.log(name, 1);
    return 'Wrong';
});
queue.tap('2', function (name, age) {
    console.log(name, 2);
});
queue.tap('3', function (name, age) {
    console.log(name, 3);
});
queue.call('zfpx');//call的意思就是调用的意思，也就是触发事件的意思