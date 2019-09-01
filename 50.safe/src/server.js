const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var svgCaptcha = require('svg-captcha');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));
const goods = {
    'book': [{ name: '变形计' }, { name: '双城记' }],
    'electronic': [{ name: 'ipad' }, { name: 'iphone' }]
}
app.get('/goods', function (req, res) {
    let { category } = req.query;
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    let currentGoods = goods[category];
    let detail = '';
    if (currentGoods) {
        detail = currentGoods.map(item => `<li>${item.name}</li>`).join('')
    } else {
        detail = '此分类下面没有商品';
    }
    res.send(`
      <h1>你选择的商品分类是: ${category}</h1>
      <ul>${detail}</ul>
   `);
});
//此路由用来获取所有的评论
let defaultComment = { time: new Date().toLocaleString(), avatar: 'http://www.gravatar.com/avatar/836875012qq.com.png' };
let comments = [
    { username: '张三', content: '今天下雨了', ...defaultComment },
    { username: '李四', content: '今天没带伞', ...defaultComment }
];
app.get('/api/comments', function (req, res) {
    res.json({ code: 0, comments });
});
function htmlEncode(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
app.post('/api/comments', function (req, res) {
    //req.cookies.sessionId=session-1528513256445657.3938924080318
    let session = sessions[req.cookies.sessionId];
    if (session && session.user) {
        let comment = req.body;// username content
        comments.push({
            ...defaultComment,
            username: session.user.username,
            content: comment.content
        });
        res.json({ code: 0 });
    } else {
        res.json({ code: 1, error: '此用户未登录，不能发表评论 ' });
    }

});
let users = [
    { username: 'a', password: 'a', balance: 1000 },
    { username: 'b', password: 'b', balance: 1000 }
];
function getAdmin(user) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == user.username && users[i].password == user.password) {
            return users[i];
        }
    }
}
//会话对象
let sessions = {};
app.post('/api/login', function (req, res) {
    let body = req.body;// username password
    let user = getAdmin(body);
    if (user) {//如果登录成功 设置cookie和session会话
        let sessionId = 'session-' + Date.now() + Math.random() * 1000;
        //把sessionId这个值发送给了客户端
        res.cookie('sessionId', sessionId, { httpOnly: true });
        res.cookie('token', 'token_' + sessionId);
        //在服务器端记录此会话ID对应的数据
        sessions[sessionId] = { user };
        res.json({ code: 0, user });
    } else {
        res.json({ code: 1, error: '用户名密码错误' });
    }
});
app.get('/userInfo', function (req, res) {
    let session = sessions[req.cookies.sessionId];
    if (session && session.user) {
        res.json({ code: 0, user: session.user });
    } else {
        res.json({ code: 1, error: '用户未登录' });
    }
});
app.post('/api/transfer', function (req, res) {
    let referer = req.headers['referer'];//http://localhost:3000
    if (/^https?:\/\/localhost:3000/.test(referer)) {
        let session = sessions[req.cookies.sessionId];
        if (session && session.user) {
            let { target, amount, captcha, clientToken } = req.body;// target amount
            if (clientToken == 'token_' + req.cookies.sessionId) {
                if (captcha == session.captcha) {
                    amount = isNaN(amount) ? 0 : Number(amount);
                    for (let i = 0; i < users.length; i++) {
                        if (users[i].username == session.user.username) {
                            users[i].balance -= amount;
                        } else if (users[i].username == target) {
                            users[i].balance += amount;
                        }
                    }
                    res.json({ code: 0 });
                } else {
                    res.json({ code: 1, error: '验证码不正确' });
                }
            } else {
                res.json({ code: 1, error: 'token验证失败' });
            }

        } else {
            res.json({ code: 1, error: '用户未登录' });
        }
    } else {
        res.json({ code: 1, error: 'refer错误 ' });
    }

});


app.get('/api/captcha', function (req, res) {
    let session = sessions[req.cookies.sessionId];
    if (session) {
        var captcha = svgCaptcha.create();//生成验证码
        session.captcha = captcha.text;//把验证码的文件保存在session里
        res.json({ code: 0, data: captcha.data });//data是真正的验证码的SVG数据图
    } else {
        res.json({ code: 1, error: '用户未登录' });
    }

});
app.listen(3000);