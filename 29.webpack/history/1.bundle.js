/******/ (function (modules) { // webpackBootstrap
/******/ 	// 模块的缓存
/******/ 	var installedModules = {};
/******/
/******/ 	// 声明了一个 require方法
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// 如果缓存里已经有了，表示模块加载过了
/******/ 		if (installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
            /******/
        }
    /******/ 		// 创建一个新的模块，并且放到缓存里Create a new module (and put it into the cache)
    /******/ 		var module = installedModules[moduleId] = {
    /******/ 			i: moduleId,
    /******/ 			l: false,
    /******/ 			exports: {}
            /******/
        };
    /******/
    /******/ 		// 执行模块函数
    /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    /******/ 		// 标记模块为加载过的 Flag the module as loaded
    /******/ 		module.l = true;
    /******/
    /******/ 		//返回模块的导出对象 Return the exports of the module
    /******/ 		return module.exports;
        /******/
    }

    /******/ 	// Load entry module and return exports
    /******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
    /******/
})
    /************************************************************************/
    /******/({

    /***/ "./src/index.js":
    /*!**********************!*\
      !*** ./src/index.js ***!
      \**********************/
    /*! no static exports found */
    /***/ (function (module, exports) {

                eval("console.log('hello');\r\ndocument.getElementById('app').innerHTML = 'zfpx';\r\n// npx 可以直接运行node_modules/.bin目录下面的命令\r\n//通过配置package.json中的script \"build\":\"webpack\"\r\n//如果npm很慢的话，就不要再用了。用cnpm\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

                /***/
            })

        /******/
    });