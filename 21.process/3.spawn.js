//spawn 产卵 linux
let { spawn } = require('child_process');
let path = require('path');
//cwd current working dictionary 当前的工作目录
//pipe 管道 在父进程 和子进程之间建立一个管道
//如果放的是一个流，则意味着父进程 和子进程共享 一个流
let p1 = spawn('node', ['test3.js', 'zfpx'], {
    cwd: path.join(__dirname, 'test1'),
    stdio: ['ipc', process.stdout, 'ignore']
});
let p2 = spawn('node', ['test2.js'], {
    cwd: path.join(__dirname, 'test1'),
    stdio: ['pipe', 'pipe', 'pipe']
});
p1.on('message', function (msg) {
    console.log(msg);
});
//ipc则着父子进程 之间通过消息进行通信
p1.send('hello');
//一旦指定了pipe,则意味着可以在父进程里得到 p1.stdout 得到的子进程的标准输出
// p1.stdout.on('data', function (data) {
//     console.log(data.toString());
//     p2.stdin.write(data);
// });
//每个进程 都会有标准输入流 标准输出流 错误输出流 当这些流关闭的时候会触发close事件
p1.on('close', function () {
    console.log('子进程1关闭');
});
//当这个进程退出的时候会触发exit事件
p1.on('exit', function () {
    console.log('子进程1退出');
});
p1.on('error', function (err) {
    console.log('子进程1开启失败' + err);
});