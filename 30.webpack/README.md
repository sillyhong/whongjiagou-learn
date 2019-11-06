## 任务
1. 构建一个react webpack配置
2. webpack常用的优化方案
3. 如何编写自定义loader和plugin




1.尽量减小搜索的范围
使用resolve.modules、 mainfest

2.使用loader匹配解析的时候 使用exclude 去掉node_modules文件夹


3.module.noParse 不需要在打包的文件 如node_module里面的文件 

4.libraryTargrt和library
当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到它们
- output.library 配置导出库的名称
- output.libraryTarget 配置以何种方式导出库,是字符串的枚举类型，支持以下配置

libraryTarget: commonjs exports["getName"]


5. HappyPack@next

6.全局定义变量 如环境变量  definePlugin