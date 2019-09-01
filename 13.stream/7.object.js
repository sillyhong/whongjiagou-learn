let {Transform} = require('stream');
let fs = require('fs');
let rs = fs.createReadStream('./user.json');
//普通流里的放的是Buffer,对象流里放的对象
let toJSON = Transform({
    readableObjectMode:true,//就可以向可读流里放对象
    transform(chunk,encoding,cb){
        //向可读流里的缓存区里放
      this.push(JSON.parse(chunk.toString()));
    }
});
let outJSON = Transform({
    writableObjectMode:true,//就可以向可读流里放对象
    transform(chunk,encoding,cb){
      console.log(chunk);
      cb();
    }
});
rs.pipe(toJSON).pipe(outJSON);