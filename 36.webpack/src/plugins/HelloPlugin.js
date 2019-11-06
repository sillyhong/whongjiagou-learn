class HelloPlugin {
    constructor(options){
        console.log(options);
        this.options = options;
    }
    //每个插件都需要提供 一个apply方法
    apply1(compiler){
        //compiler要启动一次新的编译
        compiler.plugin('compilation',function(compilation){
            compilation.plugin('optimize-chunk-modules',function(){
                console.log('optimize-chunk-modules');
            });
        })
    }
    apply(compiler){
        //compiler要启动一次新的编译
        //compiler.js
        compiler.hooks.compilation.tap('compilation',function(compilation,params){
            //complilation.js
            compilation.hooks.optimizeChunkModules.tap('optimizeChunkModules',function(chunks, modules){
                    console.log('success')
                    // console.log('chunks', chunks);
                    // console.log('modules', modules);
            });
        });
    }
}
module.exports = HelloPlugin;