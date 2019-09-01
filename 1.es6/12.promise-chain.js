let Promise1 = require('./Promise');
let p1 = new Promise1(function(resolve,reject){
  setTimeout(function(){
    resolve(100);
  },1000);
});
//成功回调后的值会被用来resolve当前的promise
//成功的回调里又返回了一个新的promise
//成功的回调里返回的promise还不是我自己写Promise
//如果成功的回调里返回了一个promise,那么promise2要以promise的resovle结果来resolve自己
let p2 = p1.then(function(data){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      resolve(new Promise(function(resolve,reject){
        setTimeout(function(){
          resolve(data+100);
        },1000);
      }));
    },1000);
  });
});
p2.then(function(data){
  console.log('p2成功',data);
},function(err){
  console.log('p2失败',err);
});
/**
 * 1.自己真正实现一个 PromiseA 并通过 所有的单元测试
 * 2.自己添加all race reject resolve
 *
 **/
