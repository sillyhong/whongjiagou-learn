let dgram = require('dgram');
//广播 就是当客户端对服务器说话的时候，服务器会发消息给此网络内的所有主机
let socket = dgram.createSocket('udp4');
//向对方发送消息
let buf = Buffer.from('珠峰培训');
socket.bind(41235, '192.168.0.25');
//当你向对方发消息的时候，如果没有bind过，内部会自
socket.send(buf, 3, 6, 41234, '192.168.0.25');
socket.on('message', function (msg, rinfo) {
    console.log(msg.toString());
});