import React, { Component } from 'react';
import actions from '../store/actions/todos';
import {connect} from '../react-redux';
class Todos extends Component {
    handleKeyDown = (event)=>{
        let code = event.keyCode;
        if(code == 13){
            this.props.addTodo(event.target.value);
            event.target.value = '';
        }
    }
    render() {
        return (
            <div style={{border:'1px solid green'}}>
                <input onKeyDown= {this.handleKeyDown} />
                <ul>
                    {
                        this.props.items.map((item,index)=>(
                            <li key={index} style={{textDecoration:item.completed?'line-through':''}}>
                             <span onDoubleClick={()=>this.props.toggleTodo(index)}>{item.text}</span>
                             <button onClick={()=>this.props.delTodo(index)}>删除</button>  
                            </li>
                        ))
                    }
                </ul>
                <button onClick={()=>this.props.switchType('all')} style={{color:this.props.newType=='all'?'red':'black'}}>全部</button>
                <button onClick={()=>this.props.switchType('completed')} style={{color:this.props.newType=='completed'?'red':'black'}}>只显示已完成</button>
                <button onClick={()=>this.props.switchType('uncompleted')} style={{color:this.props.newType=='uncompleted'?'red':'black'}}>只显示未完成</button>
            </div>
        )
    }
}

export default connect(
    state=>(
        {...state.todos,items:state.todos.items.filter(item=>{
            if(state.todos.newType=='completed'){
                return item.completed;
            }else if(state.todos.newType=='uncompleted'){
                return !item.completed;
            }else{
                return item;
            }
        })}
    ),
    actions)(Todos);