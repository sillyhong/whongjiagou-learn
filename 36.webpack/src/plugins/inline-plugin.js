class InlinePlugin{
    apply(compiler){
        compiler.hooks.compilation.tap('compilation',function(compilation){
            compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('ChangeTags',function(data,callback){
                data.body.forEach(function(bodyTag){
                      let src = bodyTag.attributes.src;
                      delete bodyTag.attributes.src;
                      let source = compilation.assets[src].source();
                      delete compilation.assets[src];
                      bodyTag.innerHTML= source;
                });  
                callback(null,data);
            });
        });
    }
}
module.exports = InlinePlugin;