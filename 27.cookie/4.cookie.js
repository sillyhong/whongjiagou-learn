const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.listen(8080);
/**
 * Set-Cookie:name=zfpx; Domain=a.zfpx.cn; Path=/
 * domain 就是指定此cookie是属于哪些域名的
 */
app.get('/write', function (req, res) {
    res.cookie = function (key, val, options) {
        let { domain, path, maxAge, expires, httpOnly, secure } = options;
        let parts = [`${key}=${val}`];
        if (domain) {
            parts.push(`Domain=${domain}`);
        }
        if (path) {
            parts.push(`Path=${path}`);
        }
        if (maxAge) {
            parts.push(`Max-Age=${maxAge}`);
        }
        if (expires) {
            parts.push(`Expires=${expires.toUTCString()}`);
        }
        if (httpOnly) {
            parts.push(`httpOnly`);
        }
        if (secure) {
            parts.push(`Secure`);
        }
        let cookie = parts.join('; ');
        res.setHeader('Set-Cookie', cookie);
    }
    //Set-Cookie:name=zfpx; Domain=localhost; Path=/read2; Max-Age=10000; Expires=Wed, 07 M
    res.cookie('name', 'zfpx', {
        httpOnly: true, //不允许客户端通过浏览的cookie访问
        secure: true,
        maxAge: 10 * 1000,
        path: '/read2',
        domain: 'localhost',
        expires: new Date(Date.now() + 10 * 1000)
    });
    res.end('ok');
});
app.get('/read', function (req, res) {
    res.send(req.cookies);
});
app.get('/read1', function (req, res) {
    res.send(req.cookies);
});
app.get('/read1/1', function (req, res) {
    res.send(req.cookies);
});