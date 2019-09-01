const Koa = require('koa');
const path = require('path');
const uuid = require('uuid');
const fs = require('fs');
const querystring = require('querystring');
const app = new Koa();
app.listen(3000);
Buffer.prototype.split = function (sep) {
    let pos = 0;//记录当前是从哪个索引开始查找分隔符
    let len = sep.length;//分隔符的字节长度 2
    let index = -1;//查找到的分隔子串所在的索引
    let parts = [];
    while (-1 != (index = this.indexOf(sep, pos))) {
        parts.push(this.slice(pos, index));
        pos = index + len;
    }
    parts.push(this.slice(pos))
    return parts;
}
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
        let contentType = ctx.headers['content-type'];
        console.log(contentType);
        if (contentType.includes('multipart')) {
            let matches = contentType.match(/\bboundary=(.+)/);
            let sep = '--' + matches[1];//------WebKitFormBoundaryTy7iIuU5OKqScnqj
            ctx.body = await getBody(ctx.req, sep);
        } else {
            next();
        }

    } else {
        await next();
    }
});
//返回了真正的请求体
function getBody(req, seq) {
    return new Promise(function (resolve, reject) {
        let buffers = [];
        req.on('data', function (data) {
            buffers.push(data);
        });
        req.on('end', function () {
            let all = Buffer.concat(buffers);
            let fields = {};
            let lines = all.split(seq);
            lines = lines.slice(1, -1);//2
            lines.forEach(function (line) {
                let [desc, val] = line.split('\r\n\r\n');
                desc = desc.toString();
                val = val.slice(0, -2);//去掉尾部的/r/n
                if (desc.includes('filename')) {//如果包含filename就认为它是一个文件
                    let [, line1, line2] = desc.split('\r\n');
                    let lineObj1 = querystring.parse(line1, '; ');
                    let lineObj2 = querystring.parse(line2, '; ');
                    let filepath = path.join(__dirname, 'uploads', uuid.v4());
                    fs.writeFileSync(filepath, val);
                    fields[lineObj1.name] = [
                        { ...lineObj1, ...lineObj2, filepath }
                    ]
                } else {//普通字段
                    let name = querystring.parse(desc, '; ').name.replace(/"/g, '');
                    fields[name] = val.toString();
                }

            })
            resolve(fields);
        });
    });
}
/**
 * 请求头中的内容类型
 * Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryTy7iIuU5OKqScnqj
 * 
 * 请求体
------WebKitFormBoundary2WK3bilBxisKdBXD
Content-Disposition: form-data; name="username"

123
------WebKitFormBoundary2WK3bilBxisKdBXD
Content-Disposition: form-data; name="avatar"; filename="msg.txt"
Content-Type: text/plain

abc
------WebKitFormBoundary2WK3bilBxisKdBXD--

 */

let fields = {
    username: "123",
    avatar: [
        { path }
    ]
}