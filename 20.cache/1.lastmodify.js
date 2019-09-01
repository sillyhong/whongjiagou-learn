/**
 * 1. 第一次访问服务器的时候，服务器返回资源和缓存的标识，客户端则会把此资源缓存在本地的缓存数据库中。
 * 2. 第二次客户端需要此数据的时候，要取得缓存的标识，然后去问一下服务器我的资源是否是最新的。
 * 如果是最新的则直接使用缓存数据，如果不是最新的则服务器返回新的资源和缓存规则，客户端根据缓存规则缓存新的数据。
 */
let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
// http://localhost:8080/index.html
http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url, true);
    //D:\vipcode\201801\20.cache\index.html
    let filepath = path.join(__dirname, pathname);
    fs.stat(filepath, (err, stat) => {
        if (err) {
            return sendError(req, res);
        } else {
            let ifModifiedSince = req.headers['if-modified-since'];
            let LastModified = stat.ctime.toGMTString();
            if (ifModifiedSince == LastModified) {
                res.writeHead(304);
                res.end('');
            } else {
                return send(req, res, filepath, stat);
            }
        }
    });
}).listen(8080);
function sendError(req, res) {
    res.end('Not Found');
}
function send(req, res, filepath, stat) {
    res.setHeader('Content-Type', mime.getType(filepath));
    //发给客户端之后，客户端会把此时间保存起来，下次再获取此资源的时候会把这个时间再发回服务器
    res.setHeader('Last-Modified', stat.ctime.toGMTString());
    fs.createReadStream(filepath).pipe(res);
}