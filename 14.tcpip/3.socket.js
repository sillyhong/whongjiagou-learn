//当客户端访问服务器的时候，服务器会发送给客户端一个文件
let net = require('net');
let path = require('path');
let rs = require('fs').createReadStream(path.join(__dirname, '1.test'));
net.createServer(function (socket) {
    rs.on('data', function (data) {
        let flag = socket.write(data);//可写流缓存区是否满 了
        console.log('flag=', flag);
        console.log('缓存的字节数=', socket.bufferSize);
    });
    socket.on('drain', function () {
        console.log('TCP缓存区中的数据已经发送');
    });
}).listen(8080);