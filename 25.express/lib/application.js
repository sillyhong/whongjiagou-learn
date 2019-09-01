//实现Router 和应用的分离
const Router = require('./router');
const http = require('http');
const methods = require('methods');//['get','post']
const slice = Array.prototype.slice;
// methods = http.METHODS
function Application() {
    this.settings = {};//用来保存参数
    this.engines = {};//用来保存文件扩展名和渲染函数的函数
}
Application.prototype.lazyrouter = function () {
    if (!this._router) {
        this._router = new Router();
    }
}
Application.prototype.param = function (name, handler) {
    this.lazyrouter();
    this._router.param.apply(this._router, arguments);
}
// 传二个参数表示设置，传一个参数表示获取
Application.prototype.set = function (key, val) {
    if (arguments.length == 1) {
        return this.settings[key];
    }
    this.settings[key] = val;
}
//规定何种文件用什么方法来渲染
Application.prototype.engine = function (ext, render) {
    let extension = ext[0] == '.' ? ext : '.' + ext;
    this.engines[extension] = render;
}


methods.forEach(function (method) {
    Application.prototype[method] = function () {
        if (method == 'get' && arguments.length == 1) {
            return this.set(arguments[0]);
        }
        this.lazyrouter();
        //这样写可以支持多个处理函数
        this._router[method].apply(this._router, slice.call(arguments));
        return this;
    }
});
Application.prototype.route = function (path) {
    this.lazyrouter();
    //创建一个路由，然后创建一个layer ,layer.route = route.this.stack.push(layer)
    this._router.route(path);
}
//添加中间件，而中间件和普通的路由都是放在一个数组中的，放在this._router.stack
Application.prototype.use = function () {
    this.lazyrouter();
    this._router.use.apply(this._router, arguments);
}
Application.prototype.listen = function () {
    let self = this;
    let server = http.createServer(function (req, res) {
        function done() {//如果没有任何路由规则匹配的话会走此函数
            res.end(`Cannot ${req.method} ${req.url}`);
        }
        //如果路由系统无法处理，也就是没有一条路由规则跟请求匹配，是会把请求交给done
        self._router.handle(req, res, done);
    });
    server.listen(...arguments);
}
module.exports = Application;