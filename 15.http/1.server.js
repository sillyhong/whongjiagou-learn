//如何创建一个http服务器
//http服务器是继承自tcp服务器 http协议是应用层协议，是基于TCP的。
//对请求和响应进行了包装
let http = require('http');
//req 流对象 是可读流
//res 是一个可写流 write
//发消息就等于客户端连接吗？不等于，当客户端连接上来之后先触发connection事件，
//然后可以多次发送请求，每次请求都会触发request事件。

let server = http.createServer();
let url = require('url');
//当客户端连接上服务器之后执行回调
server.on('connection', function (socket) {
    console.log('客户端连接 ');
});
//服务器监听客户端的请求，当有请求到来的时候执行回调
/**
> POST / HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.53.0
> Accept: *
> Content-Length: 9
> Content-Type: application/x-www-form-urlencoded
>
} [9 bytes data]
 */
//req代表客户端的连接，server服务器把客户端的请求信息进行解析，然后放在req上面
//res代表响应，如果希望向客户端回应消息，需要通过 res
server.on('request', function (req, res) {
    console.log(req.method);//获取请求方法名
    let { pathname, query } = url.parse(req.url, true);
    console.log(pathname);
    console.log(query);
    console.log(req.url);//获取请求路径 
    console.log(req.headers);//请求头对象
    let result = [];
    req.on('data', function (data) {
        result.push(data);
    });
    req.on('end', function () {
        let r = Buffer.concat(result);//请求体
        console.log(r.toString());
        //如果进行响应

        res.end(r);
    })
});
server.on('close', function (req, res) {
    console.log('服务器关闭 ');
});
server.on('error', function (err) {
    console.log('服务器错误 ');
});
server.listen(8080, function () {
    console.log('server started at http://localhost:8080');
});