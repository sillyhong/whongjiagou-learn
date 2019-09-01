import 'babel-polyfill';
import {takeEvery,all,call,put,take} from 'redux-saga/effects';
import * as types from './store/action-types';
export const delay = ms => new Promise(function(resolve){
  setTimeout(function(){
    resolve();
  },ms);
})
export function* increment(){
  //yield delay(1000);
  //我命令saga中间件立刻调用delay方法，并且传入1000这个参数
   yield call(delay,1000);
  //{type:'call',fn:delay,args:1000}
  //put就相当 于dispatch action
  yield put({type:types.INCREMENT})
  /** setTimeout(function(){
    dispatch({type:types.INCREMENT})
   },1000);
   **/
}

export function* watchIncrement(dispatch){
  //用来监听特定的动作，
  for(let i=0;i<3;i++){
    //take监听指定的动作 ,只不过他只监听一次
    let action = yield take(types.INCREMENT_ASYNC);
    yield increment();
  }
}
export function* watchIncrement2(dispatch){
  //用来监听特定的动作，
  yield takeEvery(types.INCREMENT_ASYNC,increment,dispatch);
}
export function* log(){
   console.log('老状态',getState());
   console.log(action);
   console.log('新状态',getState());
}
export function* watchAndLog(){
  yield takeEvery('*',log);
}

export function* rootSaga(){
  yield watchIncrement();
}