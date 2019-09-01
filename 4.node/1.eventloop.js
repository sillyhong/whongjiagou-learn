function next(){
  console.log(1);
  setTimeout(function(){
    console.log(2);
  })
  //nextick 是把这个回调函放在当前执行栈的尾部
  process.nextTick(function(){
    console.log(3);
    process.nextTick(function(){
      console.log(4);
      process.nextTick(function(){
        console.log(5);
      })// 1 2 4 5 2
    })
  })
}
next()