// dll动态连接库

const path = require('path');
const webpack = require('webpack')
/**
 * 1.尽量减小搜索的范围
 *   target: '_dll_[name]' 指定的是导出变量的名称
 *   
 */
module.exports = {
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_dll.js',
        libraryTarget: 'var',
        library: '_dll_[name]'//全局变量的名字，其它会从此变量上获取到里面的模块
    },
    // manifest 表示一个描述文件
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dist', 'manifest.json')
        })
    ]
}