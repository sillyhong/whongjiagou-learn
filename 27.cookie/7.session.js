const express = require('express');
const session = require('express-session');
//RedisStore MongoStore
let FileStore = require('./store')(session);
let MongoStore = require('mongo-store')(session);
let RedisStore = require('redis-store')(session);
let path = require('path');
const app = express();
app.use(session({
    //name: 'sid',
    resave: true,
    saveUninitialized: true,
    //rolling: true,
    store: new FileStore({
        root: path.join(__dirname, 'sessions'),
        maxAge: 10 * 1000
    }),
    // genid() {
    //     return uuid.v4();
    // },
    secret: 'zfpx',
    //自定义存放session的位置
    //store:
    cookie: {
        expires: new Date(Date.now() + 10000)
    }
}));
//当使用了session中中间件后，会在req.session属性。
//session就是客户端在服务器上保存的数据
//统计 客户端访问服务器的次数
app.get('/', function (req, res) {
    let count = req.session.count;
    console.log(count);

    if (count) {
        count = count + 1;
    } else {
        count = 1;
    }
    req.session.count = count;
    res.send(`欢迎你的第${count}次访问`);
});
app.listen(8080);