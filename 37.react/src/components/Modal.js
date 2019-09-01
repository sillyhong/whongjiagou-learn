import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'
class Modal extends Component{
    constructor(){
        super();
        this.container = document.querySelector('#modal-root');
    }
    render(){
        return ReactDOM.createPortal(this.props.children,this.container);
    }
}
export default class ModelPage extends Component{
    constructor(){
        super();
        this.state = {show:false};
    }
   render(){
       return (
           <div>
               <button onClick={()=>this.setState({show:!this.state.show})}>显示</button>
               {
                   this.state.show?<Modal>
                       <div className="modal-container">
                        <div className="modal-content">
                                <h1>显示模态窗口</h1>
                        </div>
                       </div>
                   </Modal>:null
               }
           </div>
       )
   }
}