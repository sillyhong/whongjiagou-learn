let fs = require('fs');//456789
let rs = fs.createReadStream('./13.stream/2.txt',{
    start:3,
    end:8, 
    highWaterMark:3
});
rs.on('data',function(data){
  console.log(data.toString());
});
rs.on('end',function(){
    console.log('over');
});
rs.on('error',function(err){
    console.log(err);
});
rs.on('open',function(){
    console.log('open');
});
rs.on('close',function(){
    console.log('close');
});