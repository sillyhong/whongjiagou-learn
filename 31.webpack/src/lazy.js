
document.getElementById('play').addEventListener('click',function(){
    //import 异步 加载 模块是一个es7的语法
    //在webpack里import是一个天然的分割点
    import('./video.js').then(function(video){
        let name = video.getName();
        console.log(name);
    });
    // import('./video.js').then(function(video){
    //     let name = video.getName();
    //     console.log(name);
    // });
});˜