let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
const whiteList = [
    '192.168.0.22',
    'localhost'
]
// 现在模拟的是图片服务器
let server = http.createServer(function (req, res) {
    let refer = req.headers['referer'] || req.headers['refer'];
    //如果说有refer的话，则表示是从HTML页面中引用过来的
    if (refer) {
        //http://192.168.0.22:8000/refer.html
        //http://imgsrc.baidu.com/mm.jpg
        let referHostname = url.parse(refer, true).hostname;//192.168.0.22
        let curretnHostName = url.parse(req.url, true).hostname;//imgsrc.baidu.com
        if (referHostname != curretnHostName && whiteList.indexOf(referHostname) == -1) {
            res.setHeader('Content-Type', 'image/jpg');
            fs.createReadStream(path.join(__dirname, 'forbidden.jpg')).pipe(res);
            return;
        }
    }
    console.log('normal');
    res.setHeader('Content-Type', 'image/png');
    fs.createReadStream(path.join(__dirname, 'mm.png')).pipe(res);
});
server.listen(3000);