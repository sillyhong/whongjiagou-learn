const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const  ModuleConcatenationPlugin  = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    // entry: './src/lazy.js',
    entry: {
        // index: './src/index.js',
        // main: './src/main.js',
        // pageA: './src/pageA.js',//提取公共模块
        // pageB: './src/pageB.js',
        // pageC: './src/pageC.js',
        main: './src/host.js',//host scoping
    },
    //chunkFileName chunkash
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js'
    },
    devServer:{
        open:true,
        inline:true,//在打包后文件里注入一个websocket客户端
        hot:true//启动模块热加载
    },
    optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
    },
    optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	},
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            ["env",{modules:false}]
                        ]
                    }
                },
                include:path.resolve('./src'),
                exclude:/node_modules/
            },
            {
                test:/\.css$/,
                loader:['style-loader','css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new ModuleConcatenationPlugin(),//处理内敛模块
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),//用名称代替ID
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, 'dist')],
        // }),
    ]
}