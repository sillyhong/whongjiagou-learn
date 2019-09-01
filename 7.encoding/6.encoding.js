/**
 * 1.如何把一个unicode码转成utf8编码
 * 传进去一个unicode码，返回一个utf8编码 万 4E07
 * Unicode符号范围     |        UTF-8编码方式
 (十六进制)        |              （二进制）
 ----------------------+---------------------------------------------
 0000 0000-0000 007F | 0xxxxxxx
 0000 0080-0000 07FF | 110xxxxx 10xxxxxx
 0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
 0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
 **/

// 0x 16 进制
//unicode都是十六进制,所有的汉字都是3个字节
let r = transfer(0x4E07);
/*
let b = parseInt(0x4E07.toString(2));
console.log(b);//100111000000111
// 11100100 10111000 10000111
console.log(0b11100100.toString(16));
console.log(0b10111000.toString(16));
console.log(0b10000111.toString(16));//e4b887
console.log(Buffer.from('万'));*/
//utf8是unicode一种存储方式 ，是一种实现
function transfer(number){
    /**
     * 1.要判断0x4E07在哪个范围内
     * 1.如果1范围内，则用一个字节
     * @type {string[]}
     */
  if(number<0x7F){
    //0xxxxxxx
      return '0'+(number.toString(2).padStart(7,0))
  }else if(number<0x7FF){

  }
  let arr = ["1110","10","10"];
  let str = number.toString(2);//100111000000111
  arr[2] += str.substring(str.length-6);
  arr[1] += str.substring(str.length-12,str.length-6);
  arr[0] += str.substring(0,str.length-12).padStart(4,'0');
    let result =  arr.join('');
    return parseInt(result,2).toString(16);
}
let r2 = transfer(0x65);
console.log(r2);