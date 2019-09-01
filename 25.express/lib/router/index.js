const Route = require('./route');
const Layer = require('./layer');
const url = require('url');
const methods = require('methods');
const init = require('../middle/init');
const slice = Array.prototype.slice;
//let r = Router()
//let r = new Router();
function Router() {
    function router(req, res, next) {
        router.handle(req, res, next);
    }
    Object.setPrototypeOf(router, proto);
    router.stack = [];
    //声明一个对象，用来缓存路径参数名它对应的回调函数数组
    router.paramCallbacks = {};
    //在router一加载就会加载内置 中间件
    // query
    router.use(init);
    return router;
}
let proto = Object.create(null);
//创建一个Route实例，向当前路由系统中添加一个层
proto.route = function (path) {
    let route = new Route(path);
    let layer = new Layer(path, route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);

    return route;
}
proto.use = function (path, handler) {
    if (typeof handler != 'function') {
        handler = path;
        path = '/';
    }
    let layer = new Layer(path, handler);
    layer.route = undefined;//我们正是通过layer有没有route来判断是一个中间件函数还是一个路由
    this.stack.push(layer);
}
methods.forEach(function (method) {
    proto[method] = function (path) {
        let route = this.route(path);//是在往Router里添一层
        route[method].apply(route, slice.call(arguments, 1));
        return this;
    }
});
proto.param = function (name, handler) {
    if (!this.paramCallbacks[name]) {
        this.paramCallbacks[name] = [];
    }
    // {uid:[handle1,hander2]}
    this.paramCallbacks[name].push(handler);
}
/**
 * 1.处理中间件
 * 2. 处理子路由容器 
 */
proto.handle = function (req, res, out) {
    //slashAdded是否添加过/ removed指的是被移除的字符串
    let idx = 0, self = this, slashAdded = false, removed = '';
    // /user/2
    let { pathname } = url.parse(req.url, true);
    function next(err) {
        if (removed.length > 0) {
            req.url = removed + req.url;
            removed = '';
        }
        if (idx >= self.stack.length) {
            return out(err);
        }
        let layer = self.stack[idx++];
        //在此匹配路径 params   正则+url= req.params
        if (layer.match(pathname)) {// layer.params
            if (!layer.route) { //这一层是中间件层//  /user/2
                removed = layer.path;//  /user
                req.url = req.url.slice(removed.length);// /2
                if (err) {
                    layer.handle_error(err, req, res, next);
                } else {
                    layer.handle_request(req, res, next);
                }
            } else {
                if (layer.route && layer.route.handle_method(req.method)) {
                    //把layer的parmas属性拷贝给req.params
                    req.params = layer.params;
                    self.process_params(layer, req, res, () => {
                        layer.handle_request(req, res, next);
                    });
                } else {
                    next(err);
                }
            }
        } else {
            next(err);
        }
    }
    next();
}
//用来处理param参数,处理完成后会走out函数
proto.process_params = function (layer, req, res, out) {
    let keys = layer.keys;
    let self = this;
    //用来处理路径参数
    let paramIndex = 0 /**key索引**/, key/**key对象**/, name/**key的值**/, val, callbacks, callback;
    //调用一次param意味着处理一个路径参数
    function param() {
        if (paramIndex >= keys.length) {
            return out();
        }
        key = keys[paramIndex++];//先取出当前的key
        name = key.name;// uid
        val = layer.params[name];
        callbacks = self.paramCallbacks[name];// 取出等待执行的回调函数数组
        if (!val || !callbacks) {//如果当前的key没有值，或者没有对应的回调就直接处理下一个key
            return param();
        }
        execCallback();
    }
    let callbackIndex = 0;
    function execCallback() {
        callback = callbacks[callbackIndex++];
        if (!callback) {
            return param();//如果此key已经没有回调等待执行，则意味本key处理完毕，该执行一下key
        }
        callback(req, res, execCallback, val, name);
    }
    param();
}
module.exports = Router;
/**
 * Router
 *   stack
 *      layer
 *         path route
 *                 method handler
 * Layer
 * Router Layer 路径 处理函数(route.dispatch) 有一个特殊的route属性
 * Route  layer  路径 处理函数(真正的业务代码)  有一特殊的属性method
 */

 /**
  * 1.params param
    2.模板引擎 我们会自己写一个模板支持，逻辑判断 。if while do
  */