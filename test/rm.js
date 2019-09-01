/**
 * 需求：异步删除非空目录
 */
let fs = require('fs');
let path = require('path');

function rmdirP(dir) {
    let dirs = [dir];
    let index = 0;
    function rmdir(index) {
        let dir = dirs[index];
        if (index < 0)
            return;
        fs.stat(dir, function (err, stat) {
            if (stat.isDirectory()) {
                fs.rmdir(dir, function () {
                    rmdir(--index);
                });
            } else {
                fs.unlink(dir, function () {
                    rmdir(--index);
                });
            }
        });
    }
    !function next() {
        if (index == dirs.length) {
            console.log(dirs);
            rmdir(dirs.length-1);
            return;
        }
        let current = dirs[index];
        fs.stat(current,function (err,stat) {
            if(stat.isDirectory()){
                fs.readdir(current, function (err, files) {
                    if(err){
                        console.error(err);
                        return;
                    }
                    if (files) {
                        files.forEach(file => {
                            dirs.push(path.join(current, file));
                        });
                    }
                    index++;
                    next();
                });
            }else{
                index++;
                next();
            }
        });

    }();
}
rmdirP('a');