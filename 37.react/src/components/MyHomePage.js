import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
const ColorContext = React.createContext({
    color: 'red',
    setColor: (color)=> {
        this.color = color
    }
})
const UserContext = React.createContext({
    name: 'Guest',
  });

class Title extends Component {
    static contextType = ColorContext;
    render() {
        console.log('Title context', this.context)
        //this.context
        return (
            <div>
                <h1 style={{ color: this.context.color}}>我是标题</h1>
            </div>
        )
    }
}
class Content extends Component {
//   static contextType = 
//     ColorContext
//   }

    render() {
        console.log('Content context', this.context);
        console.log('Content props', this.props);
        return (
                <ColorContext.Consumer>
                    {({color, setColor}) => (
                        <div>
                            <h1 style={{ color: color }}>我是内容</h1>
                            <button onClick={()=>setColor('green')}>变绿</button> 
                            <button onClick={()=>setColor('yellow')}>变黄</button> 
                        </div>

                    )}
                 </ColorContext.Consumer>

                
                //多个context写法
                //     <ColorContext.Consumer>
                //     {({color, setColor}) => (
                //                 <UserContext.Consumer>
                //                     {
                //                         ({name}) => (
                //                             <div>
                //                                 <h1 style={{ color: color }}>我是内容 {name}</h1>
                //                                 <button onClick={()=>setColor('green')}>变绿</button> 
                //                                 <button onClick={()=>setColor('yellow')}>变黄</button> 
                //                             </div>
                //                         )
                //                     }
                //                 </UserContext.Consumer>

                //     )}
                //  </ColorContext.Consumer>


                //单个context 简单写法 需要盛宁contextType
                // <div>
                //     <h1 style={{ color: this.context.color }}>我是内容</h1>
                //     <button onClick={()=>this.context.setColor('green')}>变绿</button> 
                //     <button onClick={()=>this.context.setColor('yellow')}>变黄</button> 
                // </div>
        )
    }
}
class Header extends Component {
    render() {
        return (
            <div>
                <Title />
            </div>
        )
    }
}
class Main extends Component {
    render() {
        return (
            <div>
                <Content setColor={this.props.setColor}/>
            </div>
        )
    }
}


export default class HomePage extends Component {
   
    //状态不能别人改，只能自己改。
    constructor() {
        super();

        this.setColor = (color) => {
            this.setState({
                color: color
            })
        }

        this.state = { 
            color: 'red',
            setColor: this.setColor
        };
    }


    // setColor = (color)=>{
    //     console.log('this', this.context)
    //     this.context = color
    //     this.setState({color});
    // }
    render() {
        return (
            // <ColorContext.Provider value={this.state} >
            <ColorContext.Provider value={this.state} >
                {/* <UserContext.Provider vaule='name'> */}
                    <Header />
                    <Main />
                {/* </UserContext.Provider> */}
            </ColorContext.Provider>
        )
    }
}