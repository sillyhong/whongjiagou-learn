let http = require('http');
let server = http.createServer(function (req, res) {
    if (req.url == '/write') {//向客户端写入cookie
        res.setHeader('Set-Cookie', "name=zfpx");
        res.end('write ok');
    } else if (req.url == '/read') {
        //客户端第二次请求的时候会向服务器发送   Cookie
        let cookie = req.headers['cookie'];
        res.end(cookie);
    } else {
        res.end('Not Found');
    }
}).listen(8080);