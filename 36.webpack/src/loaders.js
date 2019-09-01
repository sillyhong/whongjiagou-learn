let result ;
let async = false;
let loaders = [
    function(){
        console.log(1); 
        async = true;
        return 1;   
    },
    function(callback){
      
        setTimeout(function(){
            console.log(2); 
            callback();
        },3000);
        return 2;
    },
    function(){
        console.log(3);   
        return 3; 
    }
]
let i = 0;
function next(){
  if(i>=loaders.length) return;
  let loader = loaders[i++];
  if(async){
    result = loader(next);
  }else{
    result = loader(next);
    next();
  }
 
}
next();