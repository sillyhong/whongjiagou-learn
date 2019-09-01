var url1 = 'http://www.珠峰培训.com';
console.log(encodeURI(url1));

let url2 = 'http://www.baidu.com?id=' + encodeURIComponent('&?');
let url = require('url');
console.log(url.parse(url2, true).query);
