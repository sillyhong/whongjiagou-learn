/**
 * 如果本地找不到会找全局node_modules
 * 全局在哪里？
 * D:\vipcode\201801\5.npm>npm root -g
 C:\Users\Administrator\AppData\Roaming\npm\node_modules
 * 全局就是环境变量中NODE_PATH指向的目录 ,全npm install -g全局安装的目录可以不是一个目录
 *
 * 全局安装目录指向D:\node.js\node_global
 * 模块的全局加载目录也指向了D:\node.js\node_global
 */
let mime = require('mime');