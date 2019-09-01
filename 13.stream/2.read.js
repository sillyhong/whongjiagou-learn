//自定义可读流
let {Readable} = require('stream');
let util = require('util');
util.inherits(Counter,Readable);
function Counter(){
  Readable.call(this);  
  this.index = 3;
}
Counter.prototype._read = function(){
  if(this.index-->0){
    this.push(this.index+'');
  }else{
      this.push(null);
  }
}
let counter = new Counter();
counter.on('data',function(data){
    console.log(data.toString())
});