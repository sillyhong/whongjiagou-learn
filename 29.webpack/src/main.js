import color from './color';
import _ from 'lodash';
require('./index.css');
require('./less');
require('./sass.scss');
//alias
require('bootstrap');
//插件引入不需要import或者require
try{
    require('./i2')
}catch(err){
    console.log('err', err)
}
// fetch("/api/user")

require("expose-loader?$!jquery");
//直接引入第三方插件  webpack插件引入 expose-loader引入 
//使用expose-loader引入需要提前生命
console.log('main $', $)
console.log('main _', _)

//会返回一个打包后的地址
let src = require('./images/avatar.png');
let img = new Image();
img.src = src;
document.body.appendChild(img);
console.log('color',color);
let getColor = () => {
    return color;
}





// fetch("/api/user")
// fetch('http://rap2api.taobao.org/app/mock/234758/user')
fetch('/v1/user')
fetch('/v1/user2')
