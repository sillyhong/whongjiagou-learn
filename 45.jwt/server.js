const express = require('express');
const bodyParser = require('body-parser');
//jwt-simple 包
const jwt = require('./jwt');//相比session节省了内存 但是增加cpu计算
const { User } = require('./model');
const moment = require('moment');
const { secret } = require('./config');
const auth = require('./auth');
const app = express();
//把表单格式的请求体字符串转成一个对象赋给req.body application/www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//把JSON格式的请求体字符串转成一个对象赋给req.body applicaton/json
app.use(bodyParser.json());
app.use(function (req, res, next) {
    console.log('req url ', req.url)
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    next();
});
//注册
app.post('/signup', async function (req, res) {
    let user = req.body;//{username,password}
    console.log('req user', user)
    let doc = await User.create(user);//返回保存成功之后的文档对象
    console.log('doc', doc)
    res.json({
        code: 0,//0表示成功，非0表示失败
        data: {// 其它数据都放在data里
            user: {
                id: doc._id,
                username: doc.username
            }
        }
    });
});
//登录
app.post('/signin', async function (req, res) {
    let user = req.body;
    let doc = await User.findOne(user);
    if (doc) {
        //因为在此登录成功了，则需要生成签名
        let token = jwt.encode({
            user: {
                id: doc._id,
                username: doc.username,
                // cellphoe
            },
            //exp: new Date(Date.now() + 10 * 60 * 1000).getTime() / 1000
            exp: moment().add(10, 'minutes').valueOf()//指定过期 时间
        }, secret);
        res.json({
            code: 0,
            data: {
                token
            }
        });
    } else {
        res.json({
            code: 1,
            error: '用户名或密码错误'
        });
    }

});
//用户页面是一个受保护的资源。
app.get('/user', auth, function (req, res) {
    res.json({
        code: 0,
        data: {
            user: req.user
        }
    });
});
app.listen(8080, ()=>{
    console.log('server is lisetends at 8080', `http:/localhost:${8080}`)
});