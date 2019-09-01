let net = require('net');
let socket = new net.Socket();
socket.connect(8080, 'localhost', function () {
    socket.write('hello');
});
socket.setEncoding('utf8');
socket.on('data', function (data) {
    console.log(data);
});
setTimeout(function () {
    //要求关闭跟服务器的连接
    socket.end();
}, 5000);