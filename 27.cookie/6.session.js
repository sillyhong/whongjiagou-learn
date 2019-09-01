const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const app = express();
app.use(cookieParser());
//自己实现套session的原理
//这个key就是服务器向客户端写卡号时的name
const SESSION_KEY = 'connect.sid';
//记录每一个卡号和对应的数据的对应关系 
const sessions = {};
app.get('/', function (req, res) {
    let sessionId = req.cookies[SESSION_KEY];
    if (sessionId) {
        let sessionObj = sessions[sessionId];
        if (sessionObj) {
            sessionObj['balance'] -= 10;
            res.send(`你还剩${sessionObj['balance']}钱`);
        } else {
            banKa();
        }
    } else {
        banKa();
    }
    //1.卡号不能相同 2.最好不容易猜 出来
    function banKa() {
        let sessionId = uuid.v4();//编一个卡号
        //在服务器端记录此卡号对应的余额
        sessions[sessionId] = { balance: 100 };
        //把卡号发给客户端
        res.cookie(SESSION_KEY, sessionId);
        res.send(`欢迎新客户，送你一张会员卡，余额100`);
    }
});
app.listen(8080);