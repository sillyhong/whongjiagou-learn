let express = require('express');
let path = require('path');
let bodyParser = require('body-parser')
let { User } = require('./model');
let crypto = require('crypto');
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'html');
app.set('views', path.resolve('views'));

app.engine('html', require('ejs').__express);
app.get('/signup', function (req, res) {
    res.render('signup');
});
app.post('/signup', function (req, res) {
    let user = req.body;
    user.password = crypto.createHmac('SHA256', 'zfpx').update(user.password).digest('hex');
    user = new User(user);
    user.save(function (err, doc) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/signin');
        }
    });
});
app.get('/signin', function (req, res) {
    res.render('signin');
});
app.post('/signin', function (req, res) {
    let user = req.body;
    //根据用户模型创建一个用户的实体
    let userEnity = new User(user);
    userEnity.exist(function (err, doc) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/');
        }
    });
    //实现了封装和语义化
    /**
    User.findByUserNameAndPassword(user.username, user.password, function (err, doc) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/');
        }
    });
     */
});
app.get('/', function (req, res) {
    res.send('home');
});
app.listen(8080);