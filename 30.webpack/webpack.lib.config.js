const path = require('path');
const webpack = require('webpack')
/**
 * 1.尽量减小搜索的范围
 *   target: '_dll_[name]' 指定的是导出变量的名称
 *   
 */
module.exports = {
    entry: './src/lib.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        libraryTarget: 'commonjs',
        library: 'getName'//全局变量的名字，其它会从此变量上获取到里面的模块
    },

}