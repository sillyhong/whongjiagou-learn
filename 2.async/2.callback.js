/**
 * 比如我现在要读取一个文件，异步读取
 **/
let fs = require('fs');
/**
 * 回调的特点是error first
 * 调用回调函数的时候第一个参数永远是错误对象
 */
/*
 fs.readFile('./1.txt','utf8',function(err,data){
 if(err){//如果err有值，就表示程序出错了
 console.log(err);
 }else{//如果error为空，就表示 成功了，没有错误
 console.log(data);
 }
 })*/
/**
 * 回调函数的问题
 * 1. 无法捕获错误 try catch
 * 2. 不能return
 * 3. 回调地狱
 */
/*function read(filename){
 fs.readFile(filename,'utf8',function(err,data){
 throw Error('出错了')
 if(err){//如果err有值，就表示程序出错了
 console.log(err);
 }else{//如果error为空，就表示 成功了，没有错误
 console.log(data);
 }
 })
 }
 try{
 read('./1.txt');
 }catch(e){
 console.log('err',e);
 };*/

//console.log(2);

/**
 * 当你访问服务器的时候，比如要请求一个HTML页面，比如是用户列表。服务器一方面会去读取读模板文件，可能是ejs pug jade handlebar ,另外一方面还要读取数据(可能会放在文件里，也可以会放在数据里)，它们都很慢，所以都是异步的。
 * 这种恶魔金字塔有以下问题
 * 1. 非常难看
 * 2. 非常难以维护
 * 3. 效率比较低，因为它们是串行的
 **/
/*
fs.readFile('./template.txt', 'utf8', function (err, template) {
  fs.readFile('./data.txt', 'utf8', function (err, data) {
    console.log(template + ' ' + data);
  })
})*/
//如何解决这个回调嵌套的问题
//1.通过事件发布订阅来实现
//这是node核心模块中的一个类，通过它可以创建事件发射器的实例，里面有两个核心方法，一个叫on emit,on表示注册监听，emit表示发射事件
/*let EventEmitter = require('events');
let eve = new EventEmitter();
//这个html对象是存放最终数据
let html = {};//template data
//监听数据获取成功事件，当事件发生之后调用回调函数
eve.on('ready',function(key,value){
  html[key] = value;
  if(Object.keys(html).length == 2){
    console.log(html);
  }
});
fs.readFile('./template.txt', 'utf8', function (err, template) {
  //1事件名 2参数往后是传递给回调函数的参数
  eve.emit('ready','template',template);
})
fs.readFile('./data.txt', 'utf8', function (err, data) {
  eve.emit('ready','data',data);
})*/
//通过一个哨兵函数来处理
/*function done(key,value){
  html[key] = value;
  if(Object.keys(html).length == 2){
    console.log(html);
  }
}*/
function render(length,cb){
  let html={};
  return function(key,value){
    html[key] = value;
    if(Object.keys(html).length == length){
      cb(html);
    }
  }
}
let done = render(3,function(html){
  console.log(html);
});
fs.readFile('./template.txt', 'utf8', function (err, template) {
  done('template',template);
})
fs.readFile('./data.txt', 'utf8', function (err, data) {
  done('data',data);
})
