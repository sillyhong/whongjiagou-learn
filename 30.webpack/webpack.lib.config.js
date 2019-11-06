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
        // "var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
        libraryTarget: 'umd', //通过scirpt 饮用模块
        // libraryTarget: 'commonjs', //通过exports导出对象 饮用模块
        // libraryTarget: 'commonjs2', //通过emodule.export导出对象 饮用模块
        // libraryTarget: 'this', //通过emodule.export导出对象 饮用模块
        // libraryTarget: 'window', //通过exports导出对象 饮用模块
        library: 'getName'//全局变量的名字，其它会从此变量上获取到里面的模块
    },

}