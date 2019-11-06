const path = require('path');
const fs = require('fs');
/**
 * 1. 取得layout模板的路径 
 * 2. 读取layout模板的内容
 * 3. 用source替换占位符，然后返回
 */
const loaderUtils = require('loader-utils');
let defaultOptions = {
    placeholder:'{{__content__}}',
    decorator:'layout'
}
//最后一个loader 必须要返回一个js模块
module.exports = function (source) {
  // console.log('source', source)
    let callback = this.async();
   let options = loaderUtils.getOptions(this);
   options = {...defaultOptions,...options};
   let {layout,placeholder,decorator} = options;
   let regex = new RegExp(`@${decorator}\\((.+)\\)`);
   let regex2 = new RegExp(`@include\\((.+)\\)`);
   let matched2 = source.match(regex2);
   let matched = source.match(regex);
   if(matched){
    //  console.log('this.contenx', this.context)
    //  console.log('this.context,matched[1])', this.context,matched[1])// '@layout(./back.html)'
    // <!-- @layout(./back.html) -->
    // <h1>主页</h1>
     fs.readFile(path.join(this.context,matched[1]),'utf8',(err,html)=>{
      //  console.log('html', html)
        source = source.replace(matched[0],''); //<h1>主页</h1>
        // console.log('source', source)
        html = html.replace(placeholder,source);
        callback(err,`module.exports = ${JSON.stringify(html)}`);
     });
   }else if(matched2){
    // console.log('this.contenx', this.context)
    // console.log('this.context,matched[2])', this.context,matched[2])
    fs.readFile(path.join(this.context,matched2[1]),(err,included)=>{
        source = source.replace(matched2[0],included);
        fs.readFile(layout,'utf8',function(err,html){
            html = html.replace(placeholder,source);
            callback(err,`module.exports = ${JSON.stringify(html)}`);
        });
    });
   }else{
    fs.readFile(layout,'utf8',function(err,html){
        html = html.replace(placeholder,source);
        callback(err,`module.exports = ${JSON.stringify(html)}`);
      });
   }
}