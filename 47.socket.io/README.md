```js
Socket.prototype.send =
Socket.prototype.write = function(){
    //把参数列表变成一个数组
  var args = Array.prototype.slice.call(arguments);
  // ['服务器你好']
  //向数组的头部添了一个元素message['message','服务器你好']
  args.unshift('message');
  this.emit.apply(this, args);
  // this.emit('message','服务器你好');
  // socket.emit('message','服务器你好');
  return this;
};
```