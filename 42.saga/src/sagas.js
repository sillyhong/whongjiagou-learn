import 'babel-polyfill';
import {takeEvery,all,call,put,take} from 'redux-saga/effects';
import * as types from './store/action-types';
import {push} from 'react-router-redux';
let Api = {
  login(username,password){
      return new Promise(function(resolve,reject){
         //setTimeout(function(){
          resolve(username+password);
          console.log('login resolve');
        // },1000);
      });
  }
}
function* login(username,password){
  try{
    let token = yield call(Api.login,username,password);
    //let token = yield Api.login(username,password);

    console.log('token',token);
    yield put({type:types.LOGIN_SUCCESS,token});
    //跳到个人页
    yield put(push('/logout')); 
    return token;
  }catch(error){
    put({type:types.LOGIN_ERROR,error});
  }
}
function* loginFlow(){
 while(true){
     let {username,password} = yield take(types.LOGIN_REQUEST);
     let token = yield login(username,password);
     if(token){
       yield take(types.LOGOUT_REQUEST);
       //跳回登录
       yield put(push('/login')); 
     }
 }
}
function* watchAction(getState){
    yield takeEvery('*',function* (action){
      console.log(getState());
      console.log(action);
    });
   
}
export function* rootSaga({getState}){
   yield all([loginFlow(),watchAction(getState)]);
}