const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
// npm i extract-text-webpack-plugin@next
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let cssExtract = new ExtractTextWebpackPlugin({
    filename: 'css/css.css',
    allChunks: true
});
let lessExtract = new ExtractTextWebpackPlugin('css/less.css');
let sassExtract = new ExtractTextWebpackPlugin('css/sass.css');
/**
 * 有些时候我们希望把页面中的CSS文件单独拉出来保存加载
 * extract-text-webpack-plugin
 *  
 */
//let pages = ['index', 'base'];
// pages = pages.map(page => new HtmlWebpackPlugin({
//     template: './src/index.html',//指定产的HTML模板
//     filename: `${page}.html`,//产出的HTML文件名
//     title: `${page}`,
//     chunks: ['common', `${page}`],//在产出的HTML文件里引入哪些代码块
//     hash: true,// 会在引入的js里加入查询字符串避免缓存,
//     minify: {
//         removeAttributeQuotes: true
//     }
// }));
//webpack内部有一个事件流，tapable 1.0
// entry: ['./src/base.js', './src/index.js']
// 是一个字符串
// 放一个对象,多入口
module.exports = {
    //先找到每个入口(Entry)，然后从各个入口分别出发，找到依赖的模块(Module)，
    //然后生成一个Chunk(代码块),最后会把Chunk写到文件系统中(Assets)   
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, 'dist'),//输出的文件夹，只能是绝对路径 
        //name是entry名字main,hash根据打包后的文件内容计算出来的一个hash值
        filename: '[name].[hash].js' //打包后的文件名
    },
    resolve: {
        //引入模块的时候，可以不用扩展名 
        extensions: [".js", ".less", ".json"],
        alias: {//别名
            "bootstrap": "bootstrap/dist/css/bootstrap.css"
        }
    },
    //表示监控源文件的变化，当源文件发生改变后，则重新打包
    watch: false,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,//每秒钟询问的次数
        aggregateTimeout: 500//
    },
    //devtool: 'source-map',//单独文件，可以定位到哪一列出错了
    // devtool: 'cheap-module-source-map',//单独文件，体积更小，但只能定位到哪一行出错
    // devtool: 'eval-source-map',//不会生成单独文件，
    // devtool: 'cheap-module-eval-source-map',//不会生成单独文件 只定位到行，体积更小
    /*
    loader有三种写法
    use
    loader
    use+loader
    * */
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: {
                    loader: 'expose-loader',
                    options: '$'
                }
            },
            {
                test: /\.js/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ["env", "stage-0", "react"]
                    }
                }
            },
            {
                //file-loader是解析图片地址，把图片从源位置拷贝到目标位置并且修改原引用地址
                //可以处理任意的二进制，bootstrap 里字体
                //url-loader可以在文件比较小的时候，直接变成base64字符串内嵌到页面中
                test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)/,
                loader: {
                    loader: 'url-loader',
                    options: {
                        limit: 5 * 1024,
                        //指定拷贝文件的输出目录 
                        outputPath: 'images/'
                    }
                }
            },
            {
                test: /\.css$/,//转换文件的匹配正则
                //css-loader用来解析处理CSS文件中的url路径,要把CSS文件变成一个模块
                //style-loader 可以把CSS文件变成style标签插入head中
                //多个loader是有顺序要求的，从右往左写，因为转换的时候是从右往左转换
                //此插件先用css-loader处理一下css文件
                //如果压缩
                loader: cssExtract.extract({
                    use: ["css-loader?minimize"]
                })
                //loader: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.less$/,
                loader: lessExtract.extract({
                    use: ["css-loader?minimize", "less-loader"]
                })
                //use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.scss$/,
                loader: sassExtract.extract({
                    use: ["css-loader?minimize", "sass-loader"]
                })
                // use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(html|htm)/,
                loader: 'html-withimg-loader'
            }
        ]
    },
    plugins: [
        //用来自动向模块内部注入变量
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),
        new UglifyjsWebpackPlugin(),
        new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
        //此插件可以自动产出html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',//指定产的HTML模板
            filename: `index.html`,//产出的HTML文件名
            title: 'index',
            hash: true,// 会在引入的js里加入查询字符串避免缓存,
            minify: {
                removeAttributeQuotes: true
            }
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'public'),
            to: path.join(__dirname, 'dist', 'public')
        }]),
        cssExtract,
        lessExtract,
        sassExtract
    ],
    //配置此静态文件服务器，可以用来预览打包后项目
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 8000,
        compress: true,//服务器返回给浏览器的时候是否启动gzip压缩
    }
}