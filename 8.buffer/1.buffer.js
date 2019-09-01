//表示分配 一个长度为6个字节的Buffer
//会把所有的字节设置为0
//可以提供默认值
let buf1 = Buffer.alloc(6,2);
console.log(buf1);
//分配一块没有初始化的内存
let buf2 = Buffer.allocUnsafe(6);
console.log(buf2);
let buf3 = Buffer.from('珠峰');
console.log(buf3);

//let buf4 = Buffer.alloc(6);
// console.log(buf4);
// //1填充的值 2 填充的开始索引 3 结束 索引
// buf4.fill(3,1,3);// [0,3,3,0]
// console.log(buf4);
//1写的字符串 2填充的开始索引 3填充的字节长度 编码
/*buf4.write("珠峰",0,3,'utf8');
// []
console.log(buf4.toString());
buf4.write('峰',3,3,'utf8');
console.log(buf4.toString());*/

let buf5 = Buffer.alloc(6);
//向指定的索引写入一个8位的整数,也就是说占用一个字节的整数
buf5.writeInt8(0,0);
buf5.writeInt8(16,1);
buf5.writeInt8(32,2);
console.log(buf5);//[0,10,20]

let buf6 = Buffer.alloc(4);
// Big Endian 大头在前
// Little Endian 小头在头
//就是高位在前
buf6.writeInt16BE(256,0);
console.log(buf6);//[01,00,00,00]
let s = buf6.readInt16BE(0);
console.log(0x10,0o10,10,0b10);//永远输出十进制
//Buffer永远输出16进制
//LT就是低位在前
buf6.writeInt16LE(256,2);//[,,00,01]
let s2 = buf6.readInt16LE(2);//0100
console.log(buf6);//[01,00,00,01]
//把buffer转成字符串
console.log(buf6.toString());
//长度为6，每个都是1
let buf7 = Buffer.alloc(6,1);
let buf8 = buf7.slice(2,6);
console.log(buf8);
buf8.fill(4);
console.log(buf7);

/**
 * string_decoder
 * 它的出现是为了解决乱码问题
 */
let buf9 = Buffer.from('珠峰培训');
let buf10 = buf9.slice(0,5);//5
let buf11 = buf9.slice(5,7);//7
let buf12 = buf9.slice(7);
let {StringDecoder} = require('string_decoder');
let sd = new StringDecoder();
//write就是读取buffer的内容，返回一个字符串
//write的时候会判断是不是一个字符，如果是的话就输出不是的话则缓存在对象内部，等下次write的时候会把前面缓存的字符加到第二次write的buffer上再进行判断
console.log(sd.write(buf10));//珠
console.log(sd.write(buf11));//峰
console.log(sd.write(buf12));//培训



