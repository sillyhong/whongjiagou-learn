import React,{Component} from 'react';
/**
 * 高阶组件就是一个函数，用来封装重复的逻辑
 * 传进去一个老组件，返回一个新组件
 */
export default function(OldComponent,name,placeholder){
      class NewComponent extends Component{
        constructor(){
            super();
            this.state = {data:''};
        }  
        componentWillMount(){
            this.setState({data:localStorage.getItem(name)||placeholder});
        }
        render(){
            return <OldComponent data={this.state.data} />
        }
      }
      return NewComponent;
}