import React,{Component} from 'react';
import MenuLink from './MenuLink';
// import { HashRouter as Router, Route, Link} from 'react-router-dom';
import { HashRouter as Router, Route, Link} from '../react-router-dom';
// import { BrowserRouter as Router, Route, Link} from '../react-router-dom';
import NavHeader from './NavHeader'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component{
    render(){
        console.log('his.props.children', this.props.children)
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            {/* <NavHeader/> */}
                            <div className="navbar-heading">
                                <div className="navbar-brand" onClick={()=>this.context.history.push('/')}>导航管理</div>
                            </div>
                            <ul className="nav navbar-nav">
                               <MenuLink to="/home">首页</MenuLink>
                               <MenuLink to="/user">用户管理</MenuLink>
                               <MenuLink to="/profile">个人设置</MenuLink> 
                            </ul>
                        </div>
                    </nav>
                    <div className="row">
                        <div className="col-md-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}