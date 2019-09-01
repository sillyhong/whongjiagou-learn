import React,{Component} from 'react';
class List extends Component{
    render(){
        return (
           <React.Fragment>
                { this.props.messages.map((item,key)=><li key={key}>{item}</li>)}
           </React.Fragment>
        )
    }
}
export default class Messages extends Component{
    constructor(){
        super();
        this.state = {messages:[1,2,3]};
    }
    render(){
        return (
            <ul>
               <List messages = {this.state.messages}/>
            </ul>
        )
    }
}