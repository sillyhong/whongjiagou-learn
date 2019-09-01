let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let querystring = require('querystring');
let iconv = require('iconv-lite');
let qs = require('qs');
let type = require('content-type');
let zlib = require('zlib');
let app = express();
app.use(text());
//app.use(json());//处理json的请求体
//app.use(urlencoded({ extended: true }));//处理表单格式也就是urlencoded格式的请求体
//如果data是数字的话，会把它当成状态码
app.use(function (req, res, next) {
    // res.json
    res.send = function (data) {
        let type = typeof data;
        switch (type) {
            case 'object':
                data = JSON.stringify(data);
                break;
            case 'number':
                res.statusCode = data;
                data = http.STATUS_CODES[data];
                break;
            default:
                break;
        }
        res.end(data);
    }
    next();
})
//echo 回声 客户端发过来的请求体是什么，服务器响应的响应体也是什么
app.post('/user', function (req, res) {
    let body = req.body;
    res.send(body);//它可以根据参数的类型进行兼容处理
});
app.listen(8080);
//The extended option allows to choose between parsing the URL-encoded data
//with the querystring library (when false) or the qs library (when true). 
function urlencoded(options) {
    let { extended } = options;
    return function (req, res, next) {
        let contentType = req.headers['content-type'];
        if (contentType == "application/x-www-form-urlencoded") {
            let buffers = [];
            req.on('data', function (data) {
                buffers.push(data);
            });
            req.on('end', function () {
                let result = buffers.toString();//name=zfpx
                if (extended) {
                    //qs可以支持嵌套对象
                    req.body = qs.parse(result);
                } else {
                    req.body = querystring.parse(result);
                }
                next();
            });
        } else {
            next();
        }
    }
}

function json() {
    return function (req, res, next) {
        let contentType = req.headers['content-type'];
        if (contentType == "application/json") {
            let buffers = [];
            req.on('data', function (data) {
                buffers.push(data);
            });
            req.on('end', function () {
                let result = buffers.toString();//name=zfpx
                req.body = JSON.parse(result);
                next();
            });
        } else {
            next();
        }
    }
}


function text() {
    return function (req, res, next) {
        let contentType = req.headers['content-type'];
        let typeObj = type.parse(contentType);
        let charset = typeObj.parameters.charset;
        let ct = typeObj.type;
        if (ct == 'text/plain') {
            let buffers = [];
            req.on('data', function (data) {
                buffers.push(data);
            });
            req.on('end', function () {
                let r = Buffer.concat(buffers);
                let encoding = req.headers['content-encoding'];
                if (encoding == 'gzip') {
                    r = zlib.gunzipSync(r);
                }
                if (charset == 'gbk') {
                    req.body = iconv.decode(r, 'gbk');
                } else {
                    req.body = r.toString();//name=zfpx
                }
                next();
            });
        } else {
            next();
        }
    }
}