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
let crypto = require('crypto');
// http://localhost:8080/index.html
http.createServer(function (req, res) {
    let { pathname } = url.parse(req.url, true);
    //D:\vipcode\201801\20.cache\index.html
    let filepath = path.join(__dirname, pathname);
    fs.stat(filepath, (err, stat) => {
        if (err) {
            return sendError(req, res);
        } else {
            let ifNoneMatch = req.headers['if-none-match'];
            let out = fs.createReadStream(filepath);
            let md5 = crypto.createHash('md5');

            out.on('data', function (data) {
                md5.update(data);
            });
            out.on('end', function () {
                //1.相同的输入相同的输出 2 不同的输入不同的输入 3 不能从输出反推出输入 
                let etag = md5.digest('hex');
                let etag = `${stat.size}`;
                if (ifNoneMatch == etag) {
                    res.writeHead(304);
                    res.end('');
                } else {
                    return send(req, res, filepath, etag);
                }
            });

        }
    });
}).listen(8080);
function sendError(req, res) {
    res.end('Not Found');
}
function send(req, res, filepath, etag) {
    res.setHeader('Content-Type', mime.getType(filepath));
    //第一次服务器返回的时候，会把文件的内容算出来一个标识，发给客户端
    //客户端看到etag之后，也会把此标识符保存在客户端，下次再访问服务器的时候，发给服务器
    res.setHeader('ETag', etag);
    fs.createReadStream(filepath).pipe(res);

}