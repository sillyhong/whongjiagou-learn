import React,{Component} from 'react';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
export default class Switch extends Component{
    static contextTypes= {
        location:PropTypes.object
    }
    render(){
        let {pathname} = this.context.location;
        let children = this.props.children;
        for(let i=0;i<children.length;i++){
            let child = children[i];
            let {path} = child.props;
            if(pathToRegexp(path,[],{end:false}).test(pathname)){
                return child;
            }
        }
        return null;
    }
}