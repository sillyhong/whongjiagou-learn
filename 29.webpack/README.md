1. 开始使用webpack打开 2.使用css


1. npm run build
bin 下的文件使用NPM无法启动
npmx node_modules/bin/webpack

2.vscode 左侧panel 左右打开/收起文件夹

3. webpack-dev-server 可以在本地开启一个服务
在webpak.config.js 中devserver参数进行配置


4.打包后的文件放到内存中 不会放在硬盘中
5. [name].[hash].js
6. new htmlWebpackPlugin 产生html文件
参数： chunk: ['index'], 对应entry 的key值

7.CleanWebpackPlugin 每次打包后自动先清除指定文件夹

8.chunk就是一个asset资源吗？代码分割？
entry: {
    chunk1: '',
    chunk2: '',
    chunk3: '',
}

9. html-withimg-loader  处理html中的img路径
   html中的url
   js中的url   style-loader url-loader
   css中的url  style-loader url-loader

10.
-抽离外联CSS文件
  插件： min-css-extract-plugin插件
-抽离html中的内联css文件
 html-inline-css-webpack-plugin


 11压缩js和css
 -js
   terser-webpack-plugin 替换 ugilify-webapck-plugin（不支持es6问题）
 -css
  optimize-css-assets-webpack-plugin

  optimization参数 minimizer
  ```
  modules.exports = {
      optimization: {
        minimizer: {}
      }
  }
  ```

  12.通过使用outputPath和publicPath参数让css和image存放单独文件目录
  -outputPath 输出路径
  -publicPath 构建后在html里的路径
  

  13.hash和chunkhash
  -hash 每次打包会重新生成
  -chunkhash 根据入口文件构建生成的固定的hash,文件发生改变的时候才会发生改变
    适用于公共库的
  -contenthash 解决下chunkhash 下js文件发生改变，css文件的hash会进行改变，使用`mini-css-extract-plugin`里的contenhash可以避免这个问题

  参数：ext name path folder hash contenthash emoj

  14.编译less sass style-less 

  15. 处理css3前缀 postcss-loader  autoprefixer


  16.编译es6/es7/jsx
  decorator?


` 17.babel runtime 
    -bable在每个文件都插入了辅助代码，使得代码体积过大
    -babel对一些公共方法使用了非常小的辅助代码
    - 使用@babale/runtime 可以打包成一个独立模块 避免重复引入


18.eslint

19。如何太哦是打包后的代码
eval soucre-map cheao module inline 


20.打包引入第三方类库
三种方式
1. 直接引入 import require
2. 使用webpack内置插件   全局生效！
3. 使用expose-laoder 声明在所有loader之前  局部生效！


！#3不需要任何其他的插件配合，只要将下面的代码添加到所有的loader之前
模板`require("expose-loader?libraryName!./file.js");`
```
{ 
  test: require.resolve("jquery"), 
  loader: "expose-loader?jQuery"
}

require("expose-loader?$!jquery");
```


21. 外联的两种方法（不使用webpack进行打包）
- externals 参数 externals: {_: 'lodash'}
- html-webpack-externals-plugin


22.添加商标
new webpack.BannerPlugin('珠峰培训'),

23.拷贝静态文件 copy-webpack-plugin
```
nwe copy-webpack-plugin([{
    from: path.resolve()
    to: path.resolve
}])
```

24.服务器代理 porxy
-不修改路径  proxy: { '/api':'http://localhost:3000'}  //http://localhost:3000/api
-修改路径
- before after webpack-dev-server 静态资源中间件处理之前 拦截部分请求返回特定数据  或者实现mock
-webpack-dev-middleware 在express中提供webpack-dev-server 静态服务能力的一个中间件

25. resolve解析
-extension: 不用输入后缀名 .js .jsx .css. less' 
会依次尝试添加扩展名进行匹配
-alias: 配置别名可以加快webpack查找模块的速度
-modules: 直接声明依赖名的模块（如 react ），webpack 会类似 Node.js 一样进行路径搜
```
resolve: {
modules: [path.resolve(__dirname, 'node_modules')],
}
```
- mianFields
- resovleLoader

26.noParse?

27 DefinePlugin 编辑室可以配置的全局常量

28. IgnorePlugin

29.区分环境变量 mode production/development

30.devtool 上到下 体积减少 功能减少
- source-map
- cheap-module-source-map
- eval-source-map
- cheap-ProvidePluginmodule-eval-source-map


31. npm i vscode-webpack-debugger