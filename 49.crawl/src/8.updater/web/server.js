let express = require('express');
const path = require('path');
const { query } = require('../db');
const CronJob = require('cron').CronJob;
const bodyParser = require('body-parser')
const session = require('express-session')
const debug = require('debug')('crawl:server');
const { spawn } = require('child_process');
let app = express();
app.use(session({
    secret: 'whongliang',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.set('view engine', 'html');
app.set('views', path.resolve('views'));
app.engine('html',require('ejs').__express)

//登录
app.get('/login', async function (req, res) {
    res.render('login', { title: '登录' });
});
app.post('/login', async function (req, res) {
    let { email } = req.body;
    console.log('email', email)
    let oldUsers = await query(`SELECT * FROM users WHERE email=?`, [email]);
    console.log('oldUsers', oldUsers)

    if (Array.isArray(oldUsers) && oldUsers.length > 0) {
        req.session.user = oldUsers[0];
        res.redirect('/');
    } else {
        let result = await query(`INSERT INTO users(email) VALUES(?)`, [email]);
        req.session.user = {
            id: result.insertId,
            email
        }
        res.redirect('/');
    }
});

app.get('/subscribe', async function (req, res) {
    let tags = await query(`SELECT * FROM tag`);
    // let user = req.session.user;//{id,name}
    let user = { id: 1, email: '123456@qq.com' } 
    console.log('user', user)
    let selectedTags = await query(`SELECT tag_id from user_tag WHERE user_id = ?`, [user.id]);
    let selectTagIds = selectedTags.map(item => item['tag_id']);
    tags.forEach(item => {
        item.checked = selectTagIds.indexOf(item.id) != -1 ? 'true' : 'false';
    });
    res.render('subscribe', { title: '请订阅你感兴趣的标签', tags });
});

app.post('/subscribe', async function (req, res) {
    let { tags } = req.body;//[ '1', '2', '9' ] }
    // let user = req.session.user;//{id,name}
    let user = { id: 1, email: '123456@qq.com' } 
    await query(`DELETE FROM user_tag WHERE user_id=?`, [user.id]);
    for (let i = 0; i < tags.length; i++) {
        await query(`INSERT INTO user_tag(user_id,tag_id) VALUES(?,?)`, [user.id, parseInt(tags[i])])
    }
    res.redirect('/');
});

//首页
app.get('/', async function (req, res) {
    let { tagId } = req.query;
    let tags = await query(`SELECT * FROM tag`);
    console.log('tagId', tagId, 'tags', tags.length)
    tagId = tagId || tags[0].id;
    let articles = await query(`SELECT a.* from articles a inner join article_tag  t on a.id = t.article_id WHERE t.tag_id =? `, [tagId]);
    console.log('articles', articles.length)
    res.render('index', {
        tags, articles
    });
});
//根据id获取文章
app.get('/detail/:id', async function (req, res) {
    let id = req.params.id;
    let articles = await query(`SELECT * FROM articles WHERE id=? `, [id]);
    res.render('detail', { article: articles[0] });
});

app.listen(8080, () => {
    console.log('开启服务器成功')
})


let job = new CronJob('*/5 * * * *', function () {
    debug('开始执行定时任务');
    console.log('开始执行定时任务')
    //子进程
    let update = spawn(process.execPath, [path.resolve(__dirname, '../index.js')]);
    update.stdout.pipe(process.stdout);
    update.stderr.pipe(process.stderr);
    update.on('error', () =>{
        console.log('任务执行完毕！')
    })
    update.on('close', function (code) {
        console.log('更新任务，代码=%d', code);
    });
});
// job.start();

process.on('uncaughtException', function (err) {
    console.error('uncaughtException: %s', erro.stack);
});

