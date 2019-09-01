import dva from 'dva';
import { Router, Route, Switch } from 'dva/router';
import Login from './routes/Login';
import Rooms from './routes/Rooms';
import Room from './routes/Room';
import 'antd/dist/antd.css';
import user from './model/user';
import rooms from './model/rooms';
import room from './model/room';
const app = dva();

// 2. Model
// Remove the comment and define your model.
//{user:{user:null},rooms:{rooms:[],keyword:''}}
app.model(user);
app.model(rooms);
app.model(room);
// 3. Router

app.router(({ history }) =>
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/rooms" exact component={Rooms} />
      <Route path="/rooms/:id" exact component={Room} />
    </Switch>
  </Router>
);

// 4. Start
app.start('#root');
