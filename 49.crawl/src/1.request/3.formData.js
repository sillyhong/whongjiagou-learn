const request = require('request');
const fs = require('fs');
const path = require('path');
//这个对象就是要提交到服务器的对象
///在html 如果有文件的话，需要指定 encrytype="multipart-formdata"
let formData = {
    name: 'zfpx',//普通的文本字段
    age: 9,
    //一个是文件可读流
    content: fs.createReadStream(path.resolve(__dirname, 'content.txt'))
}
// $.ajax({method})
// $.get();
// $.post();
request.post({
    url: 'http://localhost:8080/upload',
    formData
});

/**
 * 客户端上传了二次，二次的文件名完全一样,也会生成新的文件
 */