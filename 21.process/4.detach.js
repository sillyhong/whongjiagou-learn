let cp = require('child_process');
let fs = require('fs');
let path = require('path');
let out = fs.openSync(path.join(__dirname, 'msg.txt'), 'w', 0o666);
let sp = cp.spawn('node', ['test4.js'], {
    detached: true,
    stdio: ['ignore', out, 'ignore']
});
//让父进程先退出
sp.unref();