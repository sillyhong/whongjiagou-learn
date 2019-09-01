import {flatten,join} from 'lodash';
//import flatten from 'lodash/flatten';
//import join from 'lodash/join';
//flatten join 
let arr = [1,[2,3],[4,[5]]];
let result = _.flatten(arr);
console.log(result);