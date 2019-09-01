let { SyncBailHook } = require('tapable');
let queue = new SyncBailHook(['name']);
queue.tap('1', function (name) {
    console.log(name, 1);
    return 'wrong'
});
queue.tap('2', function (name) {
    console.log(name, 2);
});
queue.tap('3', function (name) {
    console.log(name, 3);
});
queue.call('zfpx');