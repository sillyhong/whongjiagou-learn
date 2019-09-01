import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import UserName from './UserName';
import Mobile from './Mobile';
/**
 * 高阶组件 而是一个普通的函数，传入一个组件，返回一个新的组件
 */

 export default class Memo extends Component{
     render(){
         return (
             <form>
                  <UserName/>
                  <Mobile/>
                  留言 <textarea></textarea>  
             </form>
         )
     }
 }
