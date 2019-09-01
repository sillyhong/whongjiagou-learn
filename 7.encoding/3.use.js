let Promise = require('./Promise');
let p1 = new Promise(function(resolve){
  resolve(100);
});
p1.then(function(data){
  console.log(data);
})