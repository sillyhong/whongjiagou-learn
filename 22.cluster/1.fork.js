let cluster = require('cluster');
let http = require('http');
if (cluster.isMaster) {//如果此代码是在主进程中运行的话
    let worker = cluster.fork();
    cluster.on('fork', function () {
        console.log('开始fork');
    });
    cluster.on('online', function () {
        console.log('online 子进行已经启动成功了');
    });
    cluster.on('listening', function () {
        console.log('listening 子进程的服务器已经启动成功了，可以开始监听客户端请求了');
    });
    console.log('father');
} else if (cluster.isWorker) {
    http.createServer(function (req, res) {
        res.end('worker data');
    }).listen(8080);
    console.log('worker');
}