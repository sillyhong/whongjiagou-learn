/**
 * 1.再看一下http服务器的源码，解请求头 复习一下流的概念
 * 1. 只要知道http服务器和tcp服务器关系 
 * 2. req和res都是从socket来的，先监听socket的data事件，然后等事件发生的时候，进行解析
 * 解析出请头对象，再创建请求对象，再根据请求对象创建响应对象
 * 2. http客户端
 * 3. 压缩和加密
 */
let http = require('http');
let querystring = require('querystring');
let server = http.createServer();
server.on('request', function (req, res) {
    console.log(req.url);
    console.log(req.method);
    let result = [];
    req.on('data', function (data) {
        result.push(data);
    });
    req.on('end', function () {
        let str = Buffer.concat(result).toString();
        //如果把字符串转成对象
        let contentType = req.headers['content-type'];
        let body;
        if (contentType == 'application/x-www-form-urlencoded') {
            body = querystring.parse(str);
        } else if (contentType == 'application/json') {
            body = JSON.parse(str);
        } else {
            body = querystring.parse(str);
        }
        res.end(JSON.stringify(body))
    });
});
server.listen(8080);