import React,{Component} from 'react';
import ajax from './ajax';
class Mobile extends Component{
    render(){
        return <label>手机号<input value={this.props.data}  /><br/></label>
    }
}
export default ajax(Mobile,'mobile','手机号');

/**
 * 现在希望加载数据的时候先从local里取出一个key,然后再从接口里取出这个key的值进行显示
 */