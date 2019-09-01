let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
//判断用户是否登录，如果登录的话可以继续访问，如果不登录，则跳到登录页
function checkLogin(req, res, next) {
    if (req.cookies.username) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/login', function (req, res) {
    res.render('login', { title: '登录' });
});
app.post('/login', function (req, res) {
    let user = req.body;
    if (user.username == '1' && user.password == "1") {
        res.cookie('username', user.username, {
            httpOnly: true
        });
        res.redirect('/user');
    } else {
        res.redirect('back');
    }
});
app.get('/user', checkLogin, function (req, res) {
    let { username } = req.cookies;
    res.render('user', { title: '登录', username });
});
app.listen(8080);