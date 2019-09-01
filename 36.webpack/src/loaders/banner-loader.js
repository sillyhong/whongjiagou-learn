const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');
module.exports = function(source){
    let options = loaderUtils.getOptions(this);
    let copyright = options.copyright;
    let async = this.async();
   // path.resolve(this.context, copyright);
    this.resolve(this.context, copyright, (err, url)=>{
        fs.readFile(url,'utf8',(err,data)=>{
            async(err,data+'\n\n'+source);
        });
    })
    
}