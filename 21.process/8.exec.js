//exec同步执行一个shell命令
let { exec } = require('child_process');
let path = require('path');
//用于使用 shell执行命令
//killSignal 我们可以通过kill命令行向子进程 发射信号 
let p1 = exec('node test1.js a b c ', { maxbuffer: 1024 * 1024, encoding: 'utf8', cwd: path.join(__dirname, 'test2') }, function (err, stdout, stderr) {
    console.log(err);
    console.log(stdout);
});
//其实会向子进程发射一个信号 SIGTERM
//kill并非一定要杀死子进程，有些时候就是吓唬吓唬他
//杀死子进程 p1
setTimeout(function () {
    p1.kill();
}, 3000);