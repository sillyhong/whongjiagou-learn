//内置中间件 static 静态文件中间件
let express = require('express');
let path = require('path');
let fs = require('fs');
let mime = require('mime');
let url = require('url');
let app = express();
//此中间件会拦截客户端的请求，然后去静态文件根目录下面找一下有没有对应的文件，如果有则返回给客户端，如果没有则next
function static(root, options = {}) {
    let { dotfiles = 'ignore', etag = true, lastModified = true, setHeaders } = options;
    //所有的中间件模块都是一个方法，然后调用此方法会返回一个中间件函数
    return function (req, res, next) {
        let { pathname } = url.parse(req.url, true);// pathname=/index.html
        let file = path.join(root, pathname);//就得到此文件的绝对路径
        // /a/b/c/d.html [a,b,c,.html]
        let parts = file.split(path.sep);
        let isDotFile = parts[parts.length - 1][0] == '.';
        if (isDotFile && dotfiles == 'deny') {//拒绝访问.的隐藏文件
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 403;//客户端无权访问此文件
            return res.end(http.STATUS_CODES[403]);// Not Allowd
        }
        fs.stat(file, function (err, stat) {
            if (err) {//如果没有这个文件，会报错
                next();
            } else {
                let contentType = mime.getType(pathname);
                res.setHeader('Content-Type', contentType);
                if (etag) {
                    res.setHeader('ETag', stat.mtime.toLocaleDateString());
                }
                if (lastModified) {
                    res.setHeader('Last-Modified', stat.mtime.toUTCString());
                }
                res.setHeader('Cache-Control', `max-age=${maxAge}`);
                if (setHeaders) {
                    setHeaders(req, res, function () {
                        fs.createReadStream(file).pipe(res);
                    });
                }
            }
        });
    }
}

app.use(static(path.join(__dirname, 'public')), {
    extensions: ['html', 'htm'],
    setHeaders(req, res, callback) {
        res.setHeader('time', Date.now());
    }
});
app.get('/user', function (req, res) {
    res.end('user');
});
app.listen(8080);