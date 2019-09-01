import React,{Component} from 'react';
import PropTypes from 'prop-types';
export default class Redirect extends Component{
    static contextTypes = {
        history:PropTypes.object
    }
   componentWillMount(){
      this.context.history.push(this.props.to);
   }
   render(){
       return null;
   }
}