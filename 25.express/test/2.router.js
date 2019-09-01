const express = require('../lib/express');
const app = express();
//next表示执行下一个
//路径的分组
//restul 风格的API接口  GET /user | POST /user | DELETE /user | PUT /user
//相同路径的接口只匹配一次就可以了
app.get('/', function (req, res, next) {
    console.log(1);
    next('Wrong');//如果任何出错了，会把错误交给next,然后会跳过后面所有的正常处理函数，交给错误处理中间件来进行处理
}, function (req, res, next) {
    console.log(11);
    next();
})
app.get('/2', function (req, res, next) {
    console.log(2);
    next();
})
app.get('/', function (req, res, next) {
    console.log(3);
    res.end('ok');
});
app.listen(3000);
// http://localhost:3000/