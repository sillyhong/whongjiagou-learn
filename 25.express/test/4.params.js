const express = require('../lib/express');
const app = express();
//用来批量处理路径参数
app.param('uid', function (req, res, next, val, name) {
    req.user = { id: 1, name: 'zfpx' };
    next();
})
app.param('uid', function (req, res, next, val, name) {
    req.user.name = 'zfpx2';
    next();
})
//路径参数 因这这个参数是在路径里面的
// vue angular react params
// /user/([^\/]+?)  /user/1
app.get('/user/:uid', function (req, res) {
    console.log(req.params);//路径参数对象 {uid:1}
    console.log(req.user);
    res.end('user');
});
app.get('/user2/:uid/:name', function (req, res) {
    console.log(req.params);//路径参数对象 {uid:1}
    console.log(req.user);
    res.end('user');
});
app.listen(3000);