const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
//当服务器端收到请求体的时候，如果它是一个formdata类型，则会把接收里面并解析
//里面的数据，数据分成二种，一种是普通的文本，一种是文件
// 普通的文件数据放在req.body 文件数据呢放在req.file里
const upload = multer({
    //指定文件的临时存放目录 
    dest: path.resolve(__dirname, 'uploads')
});
const app = express();
///下面哪个中间件生效取决于请求头中的Content-Type的值
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', function (req, res) {
    req.body.id = 1;
    res.json(req.body);
});
//single表示这个请求form中只有一个文件字段
app.post('/upload', upload.single('content'), function (req, res) {
    let body = req.body;
    let file = req.file;
    console.log(body);
    console.log(file);

});
app.listen(8080);
/**
 * 1.要修改form encrytype='muliparty/formdata'
 */