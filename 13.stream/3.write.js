let {Writable} = require('stream');
let arr = [];
let ws = Writable({
    write(chunk,encoding,callback){
      arr.push(chunk);
      callback();//进行下一次写入
    }
});
for(let i=0;i<5;i++){
    ws.write(''+i,'utf8',()=>{});
}
ws.end();
setTimeout(function(){
   console.log(arr.toString());
},500);