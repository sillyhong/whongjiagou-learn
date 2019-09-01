import * as types from './action-types';
export default {
    increment(){
        return {type:types.INCREMENT,payload:1};
    },
    //过一秒加1
    thunkIncrement(){
        return function(dispatch,getState){
            setTimeout(function(){
                dispatch({type:types.INCREMENT,payload:1});
            },1000);
        }
    },
    promiseIncrement(){
        return new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve({type:types.INCREMENT,payload:1});
            },1000);
        });
    },
    payloadIncrement(){
        return {
            type:types.INCREMENT,
            payload: new Promise(function(resolve,reject){
                setTimeout(function(){
                    if(Math.random()>.5){
                        resolve(100);
                    }else{
                        reject(-100);
                    }
                },1000)
            })
        }
    }
}