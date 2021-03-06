import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
//HashRouter 通过路径 里的哈希变量实现的
//BrowserRouter  用的是 html5的history API实现 
import { HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// import { HashRouter as Router, Route, Switch} from './react-router-dom';
// import { BrowserRouter as Router, Route, Switch} from './react-router-dom';
import App from './components/App';

import User from './components/User';
import Protected from './components/Protected';
import Login from './components/Login';
/**
 * 测试驱动开发 先写一个测试用例，看看原生路由的效果，然后自己实现一个
 * Router是路由容器
 * Route代表一条的路由规则
 */
let Home = (props, context)=>{
    // location: {} match: {}  history: {}
   console.log('props', props, 'context', context)
    return <div>首页</div>
}
// let User = ()=><div>user</div>
let Profile = ()=><div>个人设置</div>
let Test = (props, context)=>{
    console.log('Test props', props, 'context', context)
    return <div>Test</div>
}

// if if if    if else  
//渲染的时候会先取当前的路径(location.hash),然后跟path进行匹配，如果能匹配上则显示component指定的组件，如果不能匹配，则不显示
ReactDOM.render(
  <Router>
  {/* <Switch> */}
          <Route path="/"  component={Home}>
              <Route path="accounts" component={Profile}/>
              <Route path="/test" component={Profile}/>
              <Route path="/test/test"  component={Test}/>
              <Route path="/login"  component={Login}/>
              <Redirect  to='/login'/>
          </Route>       
  {/* </Switch> */}
</Router>,
    document.querySelector('#root')
);
//跑通路由
// ReactDOM.render(
//          <App>
//            {/* <Router> */}
//             <Switch>
//                  {/* router 参数 component path redner */}
//                 <Route  path="/home" component={Home}/>
//                 <Rout path="/user" component={User}/>
//                 <Route path="/login" component={Login}/>
//                 <Protected path="/profile" component={Profile}/>
//             </Switch>
//            {/* </Router>  */}
//          </App>,
//       document.querySelector('#root')
//   );
/**
 * 
 {
  history:{
    push()
  },
  location:{pathname:'/home'},
  match{
    params:{},
    path:'/home',
    url:'/home'
  }
}
url /user/datail/1
path /user/datail/:id
params= {id: 1}
 */