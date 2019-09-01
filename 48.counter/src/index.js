import dva from 'dva';
import { Router, Route, Switch } from 'dva/router';
import Counter from './components/Counter';
import count from './model/count';
import home from './model/home';
// 1. 初始化
const app = dva();

// 2. 定义模型
//最终状态合并后的状态  {count:{current:0}}
app.model(count);
app.model(home);
// 3. Router
//dva并没有发明任何一个新概念，全是老东西
app.router(({ history }) =>
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Counter} />
    </Switch>
  </Router>
);
// 4. Start
app.start('#root');
