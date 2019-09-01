//有时候我们真的希望把$变成全局变量
// expose-loader?全局变量名:模块名 它会先加载此模块，然后得到模块的导出对象，并且挂载到window
//let $ = require('expose-loader?$!jquery');
let $ = require('jquery');
$('#app').html('app');
let i2 = require('./i2');
// npx 可以直接运行node_modules/.bin目录下面的命令
//通过配置package.json中的script "build":"webpack"
//如果npm很慢的话，就不要再用了。用cnpm
//可以在JS里，在入口文件里加载css代码
//因为css并不是JS模块，所以需要转换，这些转换的工作工具就是loader
require('style-loader!css-loader!./index.css');
/**
 * 当在一个模块里使用到一个公共库的时候
 */
