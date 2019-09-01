const Koa = require('koa');
const path = require('path');
// 可以把一个generator中间件转成一个koa2的中间件
const convert = require('koa-convert');
//const bodyParser = require('koa-bodyparser');
const bodyParser = require('koa-better-body');
const app = new Koa();
//上传文件，指定上传的目录 
app.use(convert(bodyParser({
    uploadDir: path.join(__dirname, 'uploads')
})));
app.listen(3000);
// GET /user 返回一个空白 表单
// POST /user 表示提交 用户注册数据
//如果要上传文件的话，express要用multer中间件 koa里面要用koa-better-body
//如果说要在表单里上传文件的话，就需要给表单增加一个enctype="multipart/form-data"
app.use(async function (ctx, next) {
    if (ctx.url == '/user' && ctx.method == 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf8');
        ctx.body = (
            `
             <form method="POST" enctype="multipart/form-data">
               <input type="text" name="username">
               <input type="file" name="avatar">
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
        //当使用了bodyparser中间件之后，当请求到来的时候，会解析请求体赋给ctx.request.body
        //fileds 是字段的意思
        ctx.body = ctx.request.fields;
    } else {
        await next();
    }
});