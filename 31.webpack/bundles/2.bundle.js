 (function(modules) { // webpackBootstrap webpack入口函数
     // install a JSONP callback for chunk loading
     //安装一个JSONP的回调函数，为了懒加载trunk
 	function webpackJsonpCallback(data) {
 		var chunkIds = data[0];//[0]
 		var moreModules = data[1];//{"./src/video.js":function()}

         // add "moreModules" to the modules object,
         //把更多的模块添加到modules对象里
         // then flag all "chunkIds" as loaded and fire callback
         // 然后标记所有的chunkIds为已加载并且触发回调函数执行
         var moduleId, chunkId, i = 0, resolves = [];
         // [0]
 		for(;i < chunkIds.length; i++) {
 			chunkId = chunkIds[i];//取出所有的chunkId
 			if(installedChunks[chunkId]) {
                 // [resolve,reject,promise]
 				resolves.push(installedChunks[chunkId][0]);
 			}//改为0表示加载完成
 			installedChunks[chunkId] = 0;
         }
         //实现了额外的chunk里的modules的属性合并到了当前modules中
 		for(moduleId in moreModules) {
 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
 				modules[moduleId] = moreModules[moduleId];
 			}
 		}
 		if(parentJsonpFunction) parentJsonpFunction(data);
 		while(resolves.length) {
 			resolves.shift()();
 		}

 	};


 	// The module cache 模块缓存
 	var installedModules = {};

     // object to store loaded and loading chunks
     //这是一个象对，用来存放加载的chunk
 	var installedChunks = {
 		"main": 0
 	};



 	// The require function 加载的方法
 	function __webpack_require__(moduleId) {

 		// Check if module is in cache 看此模块是否在缓存中
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
 		}
 		// Create a new module (and put it into the cache)
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

 		// Execute the module function
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

 		// Flag the module as loaded
 		module.l = true;

 		// Return the exports of the module
 		return module.exports;
 	}

 	// This file contains only the entry chunk.
     // The chunk loading function for additional chunks
     //这个文件只包含入口模块
     //这是一个加载额外chunk 的函数 Ensure chunkId 0
 	__webpack_require__.e = function requireEnsure(chunkId) {
 		var promises = [];// 创 建一个promise数组


 		// JSONP chunk loading for javascript
        //通过JSONP加载代码
 		var installedChunkData = installedChunks[chunkId];
 		if(installedChunkData !== 0) { // 0 means "already installed".

 			// a Promise means "currently loading". 如果有表示正在加载中
 			if(installedChunkData) {
 				promises.push(installedChunkData[2]);
 			} else {
                 // setup Promise in chunk cache
                 //在chunk缓存中创建 一个promsie
 				var promise = new Promise(function(resolve, reject) {
 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
 				});
 				promises.push(installedChunkData[2] = promise);

 				// start chunk loading 开始加载chunk
 				var head = document.getElementsByTagName('head')[0];
 				var script = document.createElement('script');

 				script.charset = 'utf-8';//设置脚本编码
 				script.timeout = 120;//设置超时时间

 				// p=webpack.config.output.publicPath /0.bundle.js
 				script.src = __webpack_require__.p + "" + chunkId + ".bundle.js";
 				var timeout = setTimeout(function(){
 					onScriptComplete({ type: 'timeout', target: script });
 				}, 120000);
 				script.onerror = script.onload = onScriptComplete;
 				function onScriptComplete(event) {
 					// avoid mem leaks in IE.
 					script.onerror = script.onload = null;
                     clearTimeout(timeout);
                     //缓存的chunks对象
 					var chunk = installedChunks[chunkId];
 					if(chunk !== 0) {//如果不为0一般是没加载成功
 						if(chunk) {
 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
 							var realSrc = event && event.target && event.target.src;
 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
 							error.type = errorType;
 							error.request = realSrc;
 							chunk[1](error);
 						}
 						installedChunks[chunkId] = undefined;
 					}
 				};
 				head.appendChild(script);
 			}
 		}
 		return Promise.all(promises);
 	};

 	// expose the modules object (__webpack_modules__)
 	__webpack_require__.m = modules;

 	// expose the module cache
 	__webpack_require__.c = installedModules;

 	// define getter function for harmony exports
 	__webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, {
 				configurable: false,
 				enumerable: true,
 				get: getter
 			});
 		}
 	};

 	// define __esModule on exports
 	__webpack_require__.r = function(exports) {
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};

 	// getDefaultExport function for compatibility with non-harmony modules
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	// Object.prototype.hasOwnProperty.call
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

 	// __webpack_public_path__
 	__webpack_require__.p = "";

 	// on error function for async loading
 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
    // 最开始的都指向一个空数组webpackJsonp
     var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
     //把数组的push方法进行了绑定，赋给了oldJsonpFunction('a')
     var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
     //对jsonArray的push方法进行了重新的赋值
 	jsonpArray.push = webpackJsonpCallback;
 	jsonpArray = jsonpArray.slice();
 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
 	var parentJsonpFunction = oldJsonpFunction;


 	// Load entry module and return exports
 	return __webpack_require__(__webpack_require__.s = "./src/lazy.js");
 })
/************************************************************************/
 ({

 "./src/lazy.js":
 (function(module, exports, __webpack_require__) {

    eval("\r\ndocument.getElementById('play').addEventListener('click',function(){\r\n    //import 异步 加载 模块是一个es7的语法\r\n    __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ./video.js */ \"./src/video.js\")).then(function(video){\r\n        let name = video.getName();\r\n        console.log(name);\r\n    });\r\n});\n\n//# sourceURL=webpack:///./src/lazy.js?");

     })
    
     });