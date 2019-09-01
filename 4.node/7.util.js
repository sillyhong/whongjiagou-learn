let util = require('util');
let obj = {name:'zfpx',home:{
  city:{name:'beijing'}
}};
console.log(obj);
console.log(util.inspect(obj,{depth:2}));
