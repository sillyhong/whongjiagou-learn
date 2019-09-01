const express = require('../lib/express');
const path = require('path');
const html = require('../lib/html');
const app = express();
const fs = require('fs');

//views是用来设置模板存放根目录
app.set('views', path.resolve('views'));
//设置模板引擎 ,如果render的没有指定模板后台名，会以这个作为后缀名
app.set('view engine', 'html');
//用来设置模板引擎，遇到html结尾的模板用html来进行渲染
//  require('ejs').__express     render(filepath,options,callback)
app.engine('.html', html);
app.use(function (req, res, next) {
    res.render = function (name, options) {
        let ext = '.' + app.get('view engine');
        name = name.indexOf('.') != -1 ? name : name + ext;
        let filepath = path.join(app.get('views'), name);
        let render = app.engines[ext];
        function done(err, html) {
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
        }
        render(filepath, options, done);
    }
    next();
});
//当客户端以GET方式访问/路径的时候执行对应的回调函数
app.get('/', function (req, res, next) {
    //render第一个参数是模板的相对路径 模板名称 ，数据对象
    res.render('index', { title: 'hello', user: { name: 'zfpx' } });
});
app.listen(3000);