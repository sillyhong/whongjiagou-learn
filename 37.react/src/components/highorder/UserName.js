import React,{Component} from 'react';
import ajax from './ajax';
import local from './local';
class UserName extends Component{
    render(){
        return <label>用户名<input value={this.props.data}  /><br/></label>
    }
}
UserName = ajax(UserName,'username','用户名');
UserName = local(UserName,'username','用户名');
export default UserName;

//希望这个值是先从localStorage里取，再从接口里取
// username => xx ==> zfpx