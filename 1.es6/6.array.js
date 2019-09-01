let arr1 = [24,56,88,90,5];
//filter 返回true此元素保留在新数组，返回false则删除
Array.prototype.filter =function(fn){
  let newArr=[];
  for(let i=0;i<this.length;i++){
    let flag = fn(this[i]);
    flag&&newArr.push(this[i])
  }
  return newArr;
}
let arr2 = arr1.filter(function(item){
  return item>=60;
});
console.log(arr2);

let arr3 = Array(3);
console.log(arr3);
arr3.fill(1);
console.log(arr3);
// map reduce reducerRight filter forEach
// some find findIndex every
let arr4 = [1,2,3];
//要求每一个元素都要符合条件
Array.prototype.every = function(fn){
  let flag = true;
  for(let i=0;i<this.length;i++){
    let flag = fn(this[i]);
    if(!flag){
      return false;
    }
  }
  return flag;
}
Array.prototype.some = function(fn){
  for(let i=0;i<this.length;i++){
    let flag = fn(this[i]);
    if(flag){
      return flag;
    }
  }
  return false;
}
Array.prototype.find = function(fn){
  for(let i=0;i<this.length;i++){
    let flag = fn(this[i]);
    if(flag){
      return this[i];
    }
  }
}
Array.prototype.findIndex = function(fn){
  for(let i=0;i<this.length;i++){
    let flag = fn(this[i]);
    if(flag){
      return i;
    }
  }
}
let result = arr4.find(function(item){
  return item == 2;
});
let index = arr4.findIndex(function(item){
  return item == 2;
});
console.log(result);
console.log(index);

function print(){
  //let arr = Array.prototype.slice.call(arguments);
  /*Array.prototype.forEach.call(arguments,function(item){
    console.log(item);
  });*/
  //把一个类数组转成数组
  Array.from(arguments).forEach(function(item){
    console.log(item);
  });
}
print('a','b','c');
//希望把一个类数组变成一个数组

//let arr6 = Array(3);
let arr6 = Array.of(3);
console.log(arr6);
