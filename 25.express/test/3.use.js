const express = require('../lib/express');
const app = express();
/**
 * 1.get是指定多个处理函数
 * 2.中间件错误处理
 * 3. 子路径系统 单独创建一个子路径系统，并且把它挂载到主路径 系统上
 * 
 */
/**
 * app.use
 * express.Router();
 */
app.use(function (req, res, next) {
    console.log('Ware1:', Date.now());
    next('Wrong');
});
//路由是完整匹配的。/ != /user 所以进不来
app.get('/', function (req, res, next) {
    res.end('1');
});
//创建一个新的路由容器，或者说路由系统
const user = express.Router();// router
user.use(function (req, res, next) {
    console.log('Ware2', Date.now());
    next();
});
//在子路径里的路径是相对于父路径 
user.get('/2', function (req, res, next) {
    res.end('2');
});
//use表示使用中间件，只需要匹配前缀就可以了
app.use('/user', user);//user第二个参数是处理函数 (req,res,next)
// req.url = /user/3
//app.use('/user', artcile);
app.use(function (err, req, res, next) {
    res.end('catch ' + err);
});
app.listen(3000, function () {
    console.log('server started at port 3000');
});