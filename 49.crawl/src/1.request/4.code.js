const request = require('request');
const iconvLit = require('iconv-lite');
//encoding=null表示告诉 request模块，不要自作多情帮我转成这字符串了，我要自己拿到buffer自已转
request({
    url: 'http://top.baidu.com/buzz?b=26&c=1&fr=topcategory_c1'
    , encoding: null
}, function (err, res, body) {
    //把一个gbk格式的buffer转成utf8字符串
    //中
    //body buffer [xx,yy]
    let response = iconvLit.decode(body, 'gbk');
    console.log(response);
});