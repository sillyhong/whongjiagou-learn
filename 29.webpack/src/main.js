import color from './color';
require('./index.css');
require('./less');
require('./sass.scss');
require('bootstrap');
//会返回一个打包后的地址
let src = require('./images/avatar.png');
let img = new Image();
img.src = src;
document.body.appendChild(img);
console.log(color);
let getColor = () => {
    return color;
}


