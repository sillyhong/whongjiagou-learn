const { Tapable, SyncHook } = require('tapable');
const t = new Tapable();
t.hooks = {
    myhook: new SyncHook()
}
let called = 0;
t.hooks.myhook.tap('myhook',()=>called++);
//t.plugin('myhook', () => called++);

t.hooks.myhook.call();
t.plugin('myhook', () => called += 10);
t.hooks.myhook.call();
console.log(called);