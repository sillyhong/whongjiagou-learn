let fs = require('fs');
let path = require('path');
let zlib = require('zlib');
console.log(process.cwd());//current working directory 当前工作目录
//用于实现压缩 transform转换流，继承自duplex双工流，
function gzip(src) {
    fs.createReadStream(src)
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream(src + '.gz'));
}
//gzip(path.join(__dirname, 'msg.txt'));
//解压
//basename 从一个路径中得到文件名，包括扩展名的,可以传一个扩展名字符参数，去掉扩展名
//extname 是获取扩展名
function gunzip(src) {
    fs.createReadStream(src)
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(path.join(__dirname, path.basename(src, '.gz'))))
}
gunzip(path.join(__dirname, 'msg.txt.gz'));