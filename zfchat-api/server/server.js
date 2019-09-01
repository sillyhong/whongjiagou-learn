const express = require('express');
const path = require('path');
const app = express();//其实是一个监听函数
//使用静态文件中间件，把当前目录下面的public目录作为静态文件根目录
// http://localhost:8080/index.html
app.use(express.static(path.resolve('public')));
let server = require('http').createServer(app);
let io = require('socket.io')(server);
server.listen(9999);