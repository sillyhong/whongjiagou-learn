/**
 * 1.再看一下http服务器的源码，解请求头 复习一下流的概念
 * 1. 只要知道http服务器和tcp服务器关系 
 * 2. req和res都是从socket来的，先监听socket的data事件，然后等事件发生的时候，进行解析
 * 解析出请头对象，再创建请求对象，再根据请求对象创建响应对象
 * 2. http客户端
 * 3. 压缩和加密
 */
let http = require('http');
let server = http.createServer();
server.on('request', function (req, res) {
    res.end('ok');
});
server.listen(8080);