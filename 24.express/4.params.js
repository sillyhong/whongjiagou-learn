const express = require('./express');
const app = express();
// :意味着这个部分是一个占位符，用来匹配一个任意字符串
// restful api     GET /user/1 获取ID为1的用户详情
//  /user/zfpx/9
// vue react  路径参数
//param是用来处理路径参数的
//在此处保存路径参数名和处理函数
// app.params = {};app.params['userid'] = handler;

function getUser(userid) {
    return { userid: 1, age: 8, name: 'zfpx' };
}
function setUser(user) {
    //向数据库里保存用户
}
//接口用来修改用户的name
app.get('/username/:userid/:name', function (req, res) {
    console.log(req.user);
    req.user.name = req.params.name;
    setUser(req.user);
    res.end('update  name successfully');
});
app.get('/uesrage/:userid/:age', function (req, res) {
    console.log(req.user);
    req.user.age = req.params.age;
    setUser(req.user);
    res.end('update age successfully');
});
app.param('userid', function (req, res, next, userid) {
    req.user = getUser(userid);
    next();
});
app.listen(8080);