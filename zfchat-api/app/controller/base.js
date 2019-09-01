let { Controller } = require('egg');
class BaseController extends Controller {
    async success(data) {
        this.ctx.body = {
            code: 0,  //0表示成功
            data
        }
    }
    async error(error) {
        this.ctx.body = {
            code: 1,  //1表示失败
            error
        }
    }
}
module.exports = BaseController;