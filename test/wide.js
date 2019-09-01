// 异步广度遍历
let fs = require('fs');
let path = require('path');
let arr = [];
function wide(dir, cb) {
    console.log(dir);
    cb && cb()
    fs.readdir(dir, (err, files) => {
        !function next(i){
            if(i>= files.length) return;
            let child = path.join(dir,files[i]);
            fs.stat(child,(err,stat)=>{
                if(stat.isDirectory()){
                    wide(child, () => next(i+1));
                } else {
                    console.log(child);
                    next(i+1);
                }
            })
        }(0);
    })

}
wide('a');