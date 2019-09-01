let proxy = require('http-proxy');
let http = require('http');
let proxyServer = proxy.createProxyServer();
//正向代理 帮助或代理局域网内的用户访问外网
//反向代理 用来代理局域网内的服务器的

let server = http.createServer(function (req, res) {
    proxyServer.web(req, res, {
        target: 'http://localhost:9000'
    });
}).listen(8000);
function web(req, res, options) {
    let { host, port, pathname } = url.parse(req.url);
    let opts = {
        host,
        port,
        method: req.method,
        path: pathname,
        header: req.headers
    }
    opt.host = options.target;
    http.request(opt, function (response) {
        response.pipe(res);
    });
}