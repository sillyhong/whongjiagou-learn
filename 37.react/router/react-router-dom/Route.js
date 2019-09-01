import React,{Component} from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
export default class Route extends Component{
    constructor(props){
        super(props);
        let {path} = props;// /user/detail/:id
        this.keys = [];
        this.regexp = pathToRegexp(path,this.keys,{end:false});
        this.keys = this.keys.map(key=>key.name);
    }
    static contextTypes = {
        location:PropTypes.object,
        history:PropTypes.object
    }
    render(){
        let {path,component:Component,render,children} = this.props;
        let {location} = this.context;
        let result = location.pathname.match(this.regexp);
        let props = {
            location,
            history:this.context.history
        }
        if(result){
            let [url,...values] = result;
            props.match = {
                url,
                path,
                params:this.keys.reduce((memo,key,idx)=>{
                    memo[key] = values[idx];
                    return memo;
                },{})
            }
            if(Component){
                return <Component {...props}/>
            }else if(render){
                return render(props);
            }else if(children){
                return children(props);
            }else{
                return null;
            }
        }else{
            if(children){
                return children(props);
            }else{
                return null;
            }
        }
    }
}