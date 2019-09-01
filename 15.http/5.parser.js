// parser方法解析请求对象，其实就是请求信息，然后解析出请求头，再传给请求监听函数
let fs = require('fs');
let path = require('path');
let { StringDecoder } = require('string_decoder');
//把buffer转成字符串。可以保不乱码
let decoder = new StringDecoder();
//流有什么特点，读一点少一点
// 总请求长度是130K，请求头部分是70K，请求体应该是60K
//1 64K
//2 64K   一共读走了128K。那么意味着只剩下2K
//3 
function parser(requestStream, requestListener) {
    function onReadable() {
        let buf;
        let buffers = [];
        while (null != (buf = requestStream.read())) {
            buffers.push(buf);
            let result = Buffer.concat(buffers);
            let str = decoder.write(result);
            if (str.match(/\r\n\r\n/)) {
                let values = str.split(/\r\n\r\n/);
                let headers = values.shift();
                let headerObj = parseHeader(headers);
                Object.assign(requestStream, headerObj);
                let body = values.join('\r\n\r\n');
                requestStream.removeListener('readable', onReadable);
                //unshift
                requestStream.unshift(Buffer.from(body));
                return requestListener(requestStream);
            }
        }

    };
    requestStream.on('readable', onReadable);
}
function parseHeader(headerStr) {
    let lines = headerStr.split(/\r\n/);
    let startLine = lines.shift();
    let starts = startLine.split(' ');
    let method = starts[0];
    let url = starts[1];
    let protocal = starts[2];
    let protocalName = protocal.split('/')[0];
    let protocalVersion = protocal.split('/')[1];
    let headers = {};
    lines.forEach(line => {
        let row = line.split(': ');
        headers[row[0]] = row[1];
    });
    return { headers, method, url, protocalName, protocalVersion };
}
let rs = fs.createReadStream(path.join(__dirname, 'req.txt'));
//socket拆成二个对象，一个请求一个响应
parser(rs, function (req) {
    console.log(req.method);//POST
    console.log(req.url);// /
    console.log(req.headers);
    //应该拿到完整的请求体
    req.on('data', function (data) {
        console.log(data.toString());
    });
    req.on('end', function () {
        console.log('请求处理结束，开始响应 res.end()');
    });
});