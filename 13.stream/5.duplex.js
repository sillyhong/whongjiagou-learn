let {Duplex} = require('stream');
let index = 0;
let s = Duplex({
    read(){
        if(index++<3)
          this.push('a'); 
          else 
       this.push(null);   
    },
    write(chunk,encoding,cb){
       console.log(chunk.toString().toUpperCase());
       cb();
    }
});
//process.stdin 标准输入流
//proces.stdout标准输出流
process.stdin.pipe(s).pipe(process.stdout);