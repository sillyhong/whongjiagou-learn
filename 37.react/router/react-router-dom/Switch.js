import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {HashContext} from '../context/HashContext';

import pathToRegexp from 'path-to-regexp';
export default class Switch extends Component{
    static contextType = HashContext 
    render(){
        let {pathname} = this.context.location;
        let children = this.props.children;
        for(let i=0;i<children.length;i++){
            let child = children[i];
            let {path} = child.props;
            console.log('pathToRegexp(path,[],{end:false}).test(pathname)', pathToRegexp(path,[],{end:false}).test(pathname))
            if(pathToRegexp(path,[],{end:false}).test(pathname)){
                return child;
            }
        }
        return null;
    }
}