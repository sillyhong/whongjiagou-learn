import React,{Component} from 'react';
/**
 * 高阶组件就是一个函数，用来封装重复的逻辑
 * 传进去一个老组件，返回一个新组件
 */
export default function(OldComponent){
      class NewComponent extends Component{
        constructor(){
            super();
            this.state = {data:''};
        }  
        componentWillMount(){
            fetch('/user.json').then(response=>response.json()).then(user=>{
                this.setState({data:user[this.props.data]});
            });
           
        }
        render(){
            return <OldComponent data={this.state.data}  />
        }
      }
      return NewComponent;
}