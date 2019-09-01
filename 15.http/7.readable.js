let fs = require('fs');
let path = require('path');
let rs = fs.createReadStream(path.join(__dirname, '1.txt'), { highWaterMark: 3 });
//默认情况下，watermark 64
rs.on('readable', function () {
    //把缓存区读空 read传不传读到的字节数跟流动不流动没关系 
    let data = rs.read();//
    console.log(data);
});