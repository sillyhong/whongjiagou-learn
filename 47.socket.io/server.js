const express = require('express');
const path = require('path');
const app = express();//其实是一个监听函数
//使用静态文件中间件，把当前目录下面的public目录作为静态文件根目录
// http://localhost:8080/index.html
app.use(express.static(path.resolve('public')));

//创建一个http服务器对象
const server = require('http').createServer(app);
//因为socket.io握手要依赖http服务器
let io = require('socket.io')(server);
//监听客户端传过来的连接
//默认的命名就是/
io.of('/dev').on('connection', function (socket) {
    console.log('客户端已经连接');
    //监听socket的message事件来监听客户端传过来的消息
    socket.on('message', function (message) {
        console.log(message);
        //socket.send('server:' + message);
        //向所有的客户端进行广播,所有的连接上此服务器的客户端都能收到消息
        //广播有两种，一种是包含自己，一种是不包含自己
        // io.emit('message') 向所有的客户端进行广播 ，包括自己，自己也能听到
        //socket.broadcast.emit()向所有除了自己以外的客户端进行广播 
        io.of('/dev').emit('message', message)
    });
});
io.of('/chat').on('connection', function (socket) {
    console.log('客户端已经连接');
    let roomName;
    //监听socket的message事件来监听客户端传过来的消息
    socket.on('message', function (message) {
        console.log(message);
        //socket.send('server:' + message);
        //向所有的客户端进行广播,所有的连接上此服务器的客户端都能收到消息
        //socket.broadcast.emit('message', message);
        //向所有的人广播
        //io.of('/chat').emit('message', message)
        //向/chat命名空间内，roomName房间内的所有的人广播 ，包括
        io.of('/chat').in(roomName).emit('message', message)
    });
    //监听客户端想进入 某个房间的事件
    socket.on('join', function (name) {
        //如果进入 某个房间内了，则说话只听房间内的其它人能听见
        roomName = name;
        //socket的join方法可以用来进入某个房间
        socket.join(name);
    });
    socket.on('leave', function (name) {
        //leave方法是定死的，表示离开某个房间
        socket.leave(name);
        roomName = undefined;
    });
});

server.listen(8080);


