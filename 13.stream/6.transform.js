let {Transform}  = require('stream');
//转换流是实现数据转换的
let t = Transform({
    transform(chunk,encoding,cb){
        this.push(chunk.toString().toUpperCase());
        cb();
    }
});
process.stdin.pipe(t).pipe(process.stdout);