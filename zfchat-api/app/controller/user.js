let BaseController = require('./base');
let gravatar = require('gravatar')
// post {email:'zfpx@126.com'} jwt
class UserController extends BaseController {
    async login() {
        const { app, ctx } = this;
        let user = ctx.request.body;
        let doc = await ctx.model.User.findOne({ email: user.email });
        if (!doc) {//如果此邮件已经存在，则认为直接可以登录
            user.name = user.email.split('@')[0];//把邮件的前半部分作为用户名
            user.avatar = gravatar.url(user.email);//通过邮箱拿到头像的图片地址
            doc = await ctx.model.User.create(user);//返回一个保存后的对象
        }
        let token = app.jwt.sign(doc.toJSON(), app.config.jwt.secret);
        this.success(token);
    }
    //当第一次用户登录之后，服务器会把 token返回给客户端，客户端需要保存在到sessionStorage localStorage cookie
    //下次再访问服务器的时候要把token传给服务器(放在请求头，请求体，cookie)
    async validate() {
        const { app, ctx } = this;
        let { token } = ctx.request.body;
        try {
            let user = app.jwt.verify(token, app.config.jwt.secret);
            this.success(user);
        } catch (error) {
            this.error('用户验证失败');
        }
    }
}
module.exports = UserController;