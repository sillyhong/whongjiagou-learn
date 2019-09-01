const Koa = require('./koa');
const app = new Koa();
//koa推荐 是async 
//ctx context是koa提供一个对象，包括一些常见的方法和属性
app.use(async function (ctx, next) {
    console.log(1);
    await next();
    console.log(2);
});
app.use(async function (ctx, next) {
    console.log(3);
    await next();
    console.log(4);
});
app.use(async function (ctx, next) {
    console.log('5');
    ctx.res.end('ok');
});
//13542
app.listen(8080);