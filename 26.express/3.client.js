let http = require('http');
let zlib = require('zlib');
//node是外国人写的，不支持中国特有编码的GBK
let iconv = require('iconv-lite');
let options = {
    host: 'localhost',
    port: 8080,
    method: 'POST',
    path: '/user',
    headers: {
        'Content-Type': "text/plain; charset=gbk",
        "Content-Encoding": "gzip"// 代表此请求体是经过压缩过的
    }
}
let req = http.request(options, function (response) {
    response.pipe(process.stdout);
});
let body = iconv.encode('珠峰培训', 'gbk');
zlib.gzip(body, function (err, data) {
    req.end(data);
});

