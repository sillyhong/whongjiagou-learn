const Koa = require('koa');
const querystring = require('querystring');
const app = new Koa();
app.listen(3000);
// GET /user 返回一个空白 表单
// POST /user 表示提交 用户注册数据
app.use(async function (ctx, next) {
    if (ctx.url == '/user' && ctx.method == 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf8');
        ctx.body = (
            `
             <form method="POST">
               <input type="text" name="username">
               <input type="submit">
             </form>
            `
        );
    } else {
        await next();
    }
});
app.use(async function (ctx, next) {
    if (ctx.url == '/user' && ctx.method == 'POST') {
        ctx.body = await parse(ctx.req);
    } else {
        await next();
    }
});
function parse(req) {
    return new Promise(function (resolve, reject) {
        let buffers = [];
        req.on('data', function (data) {
            buffers.push(data);
        });
        req.on('end', function () {
            console.log('end');
            let result = Buffer.concat(buffers);
            resolve(querystring.parse(result.toString()));
        });
    });
}