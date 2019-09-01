 (function(modules) { // webpackBootstrap webpack的启动函数
 	// The module cache 模块的缓存
 	var installedModules = {};

 	// The require function 这是在浏览器端模拟的node的require方法，基本于commonjs规范的
 	function __webpack_require__(moduleId) {//参数是模块ID

 		// Check if module is in cache 检查模块是否在缓存中
 		if(installedModules[moduleId]) {
             //如果此模块已经加载过了，则直接返回缓存中的模块对象的exports导出对象
 			return installedModules[moduleId].exports;
 		}
         // Create a new module (and put it into the cache)
         //创建一个新的模块对象，并且放置到缓存中
 		var module = installedModules[moduleId] = {
 			i: moduleId,//模块的ID
 			l: false,//loaded是否已经加载完成
 			exports: {}//模块的默认导出对象，空对象
 		};

         // Execute the module function 执行模块的函数
         //第一个参数是this=模块的导出对象 模块本身 导出对象 自己模拟的require方法
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded 把此模块设置为已经加载
 		module.l = true;

 		// Return the exports of the module 返回此模块的导出对象
 		return module.exports;
 	}

     // Load entry module and return exports
     //加载入口模板并且返回它的导出对象
 	return __webpack_require__(__webpack_require__.s = "./src/lazy.js");
 })
 ({"./src/lazy.js":
 (function(module, exports) {
    eval("\r\ndocument.getElementById('play').addEventListener('click',function(){\r\n    \r\n});");
     })
});