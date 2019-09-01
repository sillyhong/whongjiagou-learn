class EmitPlugin{
    //插件的执行是异步的，异步 代码执行完毕之后肯定要调callback
    apply(compiler){
        compiler.hooks.emit.tapAsync('Emit',function(compilation,callback){
           setTimeout(function(){
            console.log('Emit');
            callback();
           },2000);
        });
    }
}

module.exports = EmitPlugin;