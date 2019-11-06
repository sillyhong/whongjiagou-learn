

1. tree shaking 从rollup 中借鉴过来 app函数和未使用的函数不会打包进去   
 缺点： 只能去掉es6语法，因为使用e6语法不会解析打包？
        不能编译为es5 没有意义


2. webpack提取公共代码

CommonsChunkPlugin已经被废弃 ？改用 common-chunk-and-vendor-chunk
[CommonsChunkPlugin 与Dllplugin &DllReferencePlugin与SplitChunksPlugin](https://www.cnblogs.com/jjucap/p/10443949.html)

3.ModuleConcatenationPlugin 变量提升
函数由两个变成了一个，hello.js 中定义的内容被直接注入到了 main.js 中

处理内敛模块 
let a = 10
let b = 1
let c = a + b
<!-- ======== -->
let c = 10 + 1

4. lazy 异步加载
import().then()

webpackJsonpCallback