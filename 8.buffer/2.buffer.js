//拷贝
let buf1 = Buffer.from('珠峰');
let buf2 = Buffer.alloc(3);
Buffer.prototype.copy2 = function (targetBuffer,targetStart,sourceStart,sourceEnd) {
    for(let i=sourceStart;i<sourceEnd;i++){
        targetBuffer[targetStart++] = this[i];
    }
}
buf1.copy2(buf2,0,0,3);
console.log(buf2.toString());

//concat连接buffer
let buf3 = Buffer.from('珠');
let buf4 = Buffer.from('峰');
Buffer.concat2 = function(list,total=list.reduce((len,item)=>len+item.length,0)){
  if(list.length==1){
      return list[0];
  }
  //Buffer
  let result = Buffer.alloc(total);
  let index=0;
  for(let buf of list){
      for(let b of buf){
          if(index>=total){
             return result;
          }else{
              result[index++] = b;
          }
      }
  }
  return result;
}
let result = Buffer.concat2([buf3,buf4],5);
console.log(result);



//A-Za-z0-9+/
//console.log(Buffer.from(str));//0-255
//e7 8f a0 00111111 00111111 00111111 00111111 ////
const CHARTS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function transfer(strs) {
  let buf = Buffer.from(strs);
  let result = '';
  for(let b of buf){
      result+=b.toString(2);
  }
  console.log(result);
  //111001 111000 111110 100000
  //['','','','']
  return result.match(/(\d{6})/g).map(item=>parseInt(item,2)).map(item=>CHARTS[item]).join('');
}

console.log(transfer('珠'));


