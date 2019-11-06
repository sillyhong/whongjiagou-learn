class InlinePlugin{
    apply(compiler){
        //html-webpack-plugin --> htmlWebpackPluginAlterAssetTagsa插件
        compiler.hooks.compilation.tap('compilation',function(compilation){
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('ChangeTags',function(data,callback){
                data.body.forEach(function(bodyTag){
                    //获取标签src
                      let src = bodyTag.attributes.src;
                      //删除标签src
                      delete bodyTag.attributes.src;
                      //获取源码
                      let source = compilation.assets[src].source();
                      //删除编译出来的源码
                      delete compilation.assets[src];
                      //把源码放到内敛标签中
                      bodyTag.innerHTML= source;

                      //样式改版
                });  
                //err,data
                //data要往下穿
                // callback(null,data);
                callback(null, data)
            });
        });
    }
}
module.exports = InlinePlugin;