class Koa {
    constructor() {
        this.middleware = [];
    }
    use(fn) {
        this.middleware.push(fn);
    }
    listen(port) {
        let middleware = this.middleware;
        require('http').createServer((req, res) => {
            let ctx = { req, res };
            // koa2.0 3.0
            // dispatch(0);
            // function dispatch(idx) {
            //     middleware[idx](ctx, () => next(idx + 1));
            // }
            // [1,2,3]
            //是koa1.0原理
            (middleware.reduceRight((val, item) => {
                return item.bind(null, ctx, val);
            }, (function () { })))()
        }).listen(port);
    }
}
module.exports = Koa;