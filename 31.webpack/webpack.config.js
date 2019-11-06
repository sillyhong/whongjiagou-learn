const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const  ModuleConcatenationPlugin  = require('webpack/lib/optimize/ModuleConcatenationPlugin');
module.exports = {
    entry: './src/lazy.js',//懒加载
    // entry: './src/main.js',
    //chunkFileName chunkash
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    // module: {
    //     rules:[
    //         {
    //             test:/\.js$/,
    //             use:{
    //                 loader:'babel-loader',
    //                 options:{
    //                     presets:[
    //                         ["env",{modules:false}]
    //                     ]
    //                 }
    //             },
    //             include:path.resolve('./src'),
    //             exclude:/node_modules/
    //         },
    //         {
    //             test:/\.css$/,
    //             loader:['style-loader','css-loader']
    //         }
    //     ]
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filenae: 'index.html'
        })
    ]
}