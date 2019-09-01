let dgram = require('dgram');
let socket = dgram.createSocket('udp4');
//向对方发送消息
let buf = Buffer.from('珠峰培训');
//当你向对方发消息的时候，如果没有bind过，内部会自
socket.send(buf, 3, 6, 41234, 'localhost', function () {
    console.log(arguments);
});
socket.on('message', function (msg, rinfo) {
    console.log(msg.toString());
});