const Koa = require('koa');
const app = new Koa();
//如何获取koa的请求参数
// request response req res
app.use(function (ctx, next) {
    console.log(ctx.method);
    console.log(ctx.url);
    console.log(ctx.headers);
    console.log(ctx.querystring);//查询字符串
    console.log(ctx.query);
    /**
     * 1. 字符串 Buffer
     * 2. 对象
     * 3. 流
     */
    //res.end res.write.
    //ctx.res.write('helo'); 在koa里不能直接通过 这种写入响应体
    ctx.body = ctx.headers;
    //ctx.response.body = ctx.headers;;
});
app.listen(8080);