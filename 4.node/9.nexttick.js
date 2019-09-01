function Clock(){
  this.listener;

  process.nextTick(()=>{
    this.listener();
  })
}
Clock.prototype.add = function(listener){
  this.listener = listener;
}
let c = new Clock();
c.add(()=>{console.log('ok')});