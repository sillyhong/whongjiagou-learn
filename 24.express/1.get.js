const express = require('./express');
const app = express();
//最重要是路由功能 根据不同的方法和不同的路径 返回不同的内容
//定义路由规则
//有些时候希望只匹配路径 ，不管什么方法都能处理
//* 表示匹配所有的路径
//route 上面可以写一堆 的路由
app.all('*', function (req, res) {
    res.end('404');
});
app.get('/hello', function (req, res) {
    res.end('hello');
});
//启动一个8080服务器
app.listen(8080, function () {
    console.log('server started at 8080');
});