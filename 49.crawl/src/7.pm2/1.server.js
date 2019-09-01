const express = require('express');
let app = express();
app.get('/', function (req, res) {
    res.send('ok');
});
setTimeout(function () {
    process.exit();
}, 3000);
app.listen(8080)
/**
 * 1. 希望服务能后台运行
 * 2. 当进行异常退出后程序照常可以自动重启
 * 
 * pm2是一个非常好的用进程管理器，可以守护我们的进程 
 * 
 */