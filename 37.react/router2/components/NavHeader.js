import React, { Component } from 'react'
// import { WithRouter } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { HashContext} from '../context/HashContext';
 class NavHeader extends Component {
    //  static contextType = HashContext
    render() {
        console.log('this.context', this.context.history)
        return (
            <div className="navbar-heading">
                <div className="navbar-brand" onClick={()=>this.props.history.push('/')}>珠峰架构</div>
            </div>
        )
    }
}
export default withRouter(NavHeader)
