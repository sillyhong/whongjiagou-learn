import React,{Component} from 'react';
import PropTypes from 'prop-types';
//location:{pathname:'/home'},
export default class HashRouter extends Component{
    static childContextTypes = {
        location:PropTypes.object,
        history:PropTypes.object
    }
    constructor(props){
        super(props);
        this.state = {location:{state:{},pathname:window.location.hash.slice(1)||'/'}};
    }
    getChildContext(){
        let that = this;
        return {
            location:this.state.location,
            history:{
                push(path){
                    if(typeof path == 'object'){
                        //state是用来保存状态的，随便
                        let {pathname,state} = path;
                        that.setState({location:{...that.state.location,state}},()=>{
                            window.location.hash = pathname;
                        });
                    }else{
                        window.location.hash = path;
                    }
                }
            }
        }
    }
    componentDidMount(){
        window.location.hash =  window.location.hash||'/';
        let render = ()=>{
            this.setState({location:{...this.state.location,pathname:window.location.hash.slice(1)||'/'}});
        }
        window.addEventListener('hashchange',render);
    }
    render(){
        return this.props.children;
    }
}