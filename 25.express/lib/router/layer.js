const pathToRegexp = require('path-to-regexp');
function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
    this.keys = [];
    // this.path =/user/:uid   this.keys = [{name:'uid'}];
    this.regexp = pathToRegexp(this.path, this.keys);
}
//判断这一层和传入的路径是否匹配
Layer.prototype.match = function (path) {
    if (this.path == path) {
        return true;
    }
    if (!this.route) {//这一层是一个中间件层  /user/2
        // this.path = /user  
        return path.startsWith(this.path + '/');
    }
    //如果这个Layer是一个路由的 Layer
    if (this.route) {
        let matches = this.regexp.exec(path); //   /user/1
        // ['',1,'zfpx']
        if (matches) {
            this.params = {};
            for (let i = 1; i < matches.length; i++) {
                let name = this.keys[i - 1].name;
                let val = matches[i];
                this.params[name] = val;
            }
            return true;
        }
    }
    return false;
}
Layer.prototype.handle_request = function (req, res, next) {
    this.handler(req, res, next);
}
Layer.prototype.handle_error = function (err, req, res, next) {
    if (this.handler.length != 4) {
        return next(err);
    }
    this.handler(err, req, res, next);
}
module.exports = Layer;