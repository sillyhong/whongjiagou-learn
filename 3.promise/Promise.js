const PENDING =  'pending';//初始态
const FULFILLED =  'fulfilled';//初始态
const REJECTED =  'rejected';//初始态
function Promise(executor){
  let self = this;//先缓存当前promise实例
  self.status = PENDING;//设置状态
  //定义存放成功的回调的数组
  self.onResolvedCallbacks = [];
  //定义存放失败回调的数组
  self.onRejectedCallbacks = [];
  //当调用此方法的时候，如果promise状态为pending,的话可以转成成功态,如果已经是成功态或者失败态了，则什么都不做
  //2.1
  function resolve(value){ //2.1.1
    if(value!=null &&value.then&&typeof value.then == 'function'){
      return value.then(resolve,reject);
    }
    //如果是初始态，则转成成功态
    //为什么要把它用setTimeout包起来
    setTimeout(function(){
      if(self.status == PENDING){
        self.status = FULFILLED;
        self.value = value;//成功后会得到一个值，这个值不能改
        //调用所有成功的回调
        self.onResolvedCallbacks.forEach(cb=>cb(self.value));
      }
    })

  }
  function reject(reason){ //2.1.2
    setTimeout(function(){
      //如果是初始态，则转成失败态
      if(self.status == PENDING){
        self.status = REJECTED;
        self.value = reason;//失败的原因给了value
        self.onRejectedCallbacks.forEach(cb=>cb(self.value));
      }
    });

  }
  try{
    //因为此函数执行可能会异常，所以需要捕获，如果出错了，需要用错误 对象reject
    executor(resolve,reject);
  }catch(e){
    //如果这函数执行失败了，则用失败的原因reject这个promise
    reject(e);
  };
}
function resolvePromise(promise2,x,resolve,reject){
  if(promise2 === x){
    return reject(new TypeError('循环引用'));
  }
  let called = false;//promise2是否已经resolve 或reject了
  if(x instanceof Promise){
    if(x.status == PENDING){
      x.then(function(y){
        resolvePromise(promise2,y,resolve,reject);
      },reject);
    }else{
      x.then(resolve,reject);
    }
  //x是一个thenable对象或函数，只要有then方法的对象，
  }else if(x!= null &&((typeof x=='object')||(typeof x == 'function'))){
    //当我们的promise和别的promise进行交互，编写这段代码的时候尽量的考虑兼容性，允许别人瞎写
   try{
     let then = x.then;
     if(typeof then == 'function'){
       //有些promise会同时执行成功和失败的回调
       then.call(x,function(y){
         //如果promise2已经成功或失败了，则不会再处理了
          if(called)return;
          called = true;
          resolvePromise(promise2,y,resolve,reject)
       },function(err){
         if(called)return;
         called = true;
         reject(err);
       });
     }else{
       //到此的话x不是一个thenable对象，那直接把它当成值resolve promise2就可以了
       resolve(x);
     }
   }catch(e){
     if(called)return;
     called = true;
     reject(e);
   }

  }else{
    //如果X是一个普通 的值，则用x的值去resolve promise2
    resolve(x);
  }
}
//onFulfilled 是用来接收promise成功的值或者失败的原因
Promise.prototype.then = function(onFulfilled,onRejected){
  //如果成功和失败的回调没有传，则表示这个then没有任何逻辑，只会把值往后抛
  //2.2.1
  onFulfilled = typeof onFulfilled == 'function'?onFulfilled:function(value){return  value};
  onRejected = typeof onRejected == 'function'?onRejected:reason=>{throw reason};
  //如果当前promise状态已经是成功态了，onFulfilled直接取值
  let self = this;
  let promise2;
  if(self.status == FULFILLED){
    return promise2 = new Promise(function(resolve,reject){
      setTimeout(function(){
        try{
          let x =onFulfilled(self.value);
          //如果获取到了返回值x,会走解析promise的过程
          resolvePromise(promise2,x,resolve,reject);
        }catch(e){
          //如果执行成功的回调过程中出错了，用错误原因把promise2 reject
          reject(e);
        }
      })

    });
  }
  if(self.status == REJECTED){
    return promise2 = new Promise(function(resolve,reject){
      setTimeout(function(){
        try{
          let x =onRejected(self.value);
          resolvePromise(promise2,x,resolve,reject);
        }catch(e){
          reject(e);
        }
      })
    });
  }
  if(self.status == PENDING){
   return promise2 = new Promise(function(resolve,reject){
     self.onResolvedCallbacks.push(function(){
         try{
           let x =onFulfilled(self.value);
           //如果获取到了返回值x,会走解析promise的过程
           resolvePromise(promise2,x,resolve,reject);
         }catch(e){
           reject(e);
         }

     });
     self.onRejectedCallbacks.push(function(){
         try{
           let x =onRejected(self.value);
           resolvePromise(promise2,x,resolve,reject);
         }catch(e){
           reject(e);
         }
     });
   });
  }

}
//catch原理就是只传失败的回调
Promise.prototype.catch = function(onRejected){
  this.then(null,onRejected);
}
Promise.deferred = Promise.defer = function(){
  let defer = {};
  defer.promise = new Promise(function(resolve,reject){
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
}
function gen(times,cb){
  let result = [],count=0;
  return function(i,data){
    result[i] = data;
    if(++count==times){
      cb(result);
    }
  }
}
Promise.all = function(promises){
 return new Promise(function(resolve,reject){
   let done = gen(promises.length,resolve);
   for(let i=0;i<promises.length;i++){
     promises[i].then(function(data){
       done(i,data);
     },reject);
   }
 });
}
Promise.race = function(promises){
  return new Promise(function(resolve,reject){
    for(let i=0;i<promises.length;i++){
      promises[i].then(resolve,reject);
    }
  });
}
//返回一个立刻成功的promise
//别人提供 给你一个方法，需要你传入一个promise,但你只有一个普通的值，你就可以通过这个方法把这个普通的值(string number object)转成一个promise对象
Promise.resolve = function(value){
  return new Promise(function(resolve){
    resolve(value);
  });
}
//返回一个立刻失败的promise
Promise.reject = function(reason){
  return new Promise(function(resolve,reject){
    reject(reason);
  });
}
module.exports = Promise;


function Event() {
    this.event = {};
}
Event.prototype.on = function (type,callBack) {
    if(this.event[type]){
        this.event[type].push(callBack);
    }else{
        this.event[type] = [callBack];
    }
};
Event.prototype.emit = function (type,...data) {
    this.event[type].forEach((item)=>item(...data));
};
let event = new Event();
function fn1(){
   console.log('吃饭');
}
function fn2(){
    console.log('工作');
}
event.on('我的一天',fn1);
event.on('我的一天',fn2);
event.emit('我的一天');

