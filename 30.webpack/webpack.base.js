const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
/**
 * 1.尽量减小搜索的范围
 */
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash:8].js',
        publicPath: 'http://localhost:8080/'
    },
    //当你引入一个模块的时候，要进行解析 
    resolve: {
        // alias: {
        //     // 当加载react模块的时候，
        //     react: path.resolve('./cjs/react.production.min.js')
        // },
        extensions: ['.js', '.json'],
        mainFields: ['main', 'browser', 'node'],
        //当你需要指定除node_modules之外的其它模块目录 的话
        modules: [path.resolve('node_modules'), path.resolve('lib')]
    },
    module: {
        //不需要递归解析此模块
        //noParse: [/react\.production\.min\.js/],
        rules: [
            {
                test: /\.jsx?$/,
                use: 'happypack/loader?id=babel',
                //只转换或者编译src 目录 下的文件
                include: path.resolve('./src'),
                exclude: /node_modules/ //不要解析node_modules

            },
            {
                test: /\.css?$/,
                use: 'happypack/loader?id=css',
                //只转换或者编译src 目录 下的文件
                include: path.resolve('./src'),
                exclude: /node_modules/ //不要解析node_modules

            }
        ]
    },
    plugins: [
        //定义环境变量
        new webpack.DefinePlugin({
            __development__: JSON.stringify(process.env.NODE_ENV)
        }),
        new HappyPack({
            id: 'babel',
            loaders: ['babel-loader']
        }),
        new HappyPack({
            id: 'css',
            loaders: ['style-loader', 'css-loader']
        }),
        new webpack.DllReferencePlugin({
            manifest: path.join(__dirname, 'dist', 'manifest.json')
        }),
        //new WebpackParallelUglifyPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        })
    ]
}