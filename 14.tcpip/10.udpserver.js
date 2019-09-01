let dgram = require('dgram');
let socket = dgram.createSocket('udp4');
//发消息 
//收消息 在本机的41234端口上监听消息
socket.bind(41234, '192.168.0.25');
//监听对方发过来的消息 remoteInfo
socket.on('message', function (msg, rinfo) {
    //设置为true就表示要广播了
    console.log(msg);
    socket.setBroadcast(true);
    socket.send(Buffer.from(msg), 0, msg.length, 41235, '192.168.0.255');
});
