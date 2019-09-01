const express = require('express');
const path = require('path');
const app = express();
app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.listen(3000);
//---------------------------------------
// let WSServer = require('ws').Server;
// let wsServer = new WSServer({ port: 8888 });
// //监听客户端的连接，当客户端连接上服务器之后执行对应的回调
// //socket是插座的意思，每个客户连接上服务器之后，都会创建一个唯一的socket
// wsServer.on('connection', function (socket) {
//     console.log('客户端已经连接');
//     //监听客户端发过来的ith
//     socket.on('message', function (message) {
//         console.log(message);
//         socket.send('server:' + message);
//     });
// });