import React, { Component } from 'react';
import PropTypes from 'prop-types';
export default class Person extends Component {
    //类型校验的
    //Invalid prop `age` of type `string` supplied to `Person`, expected `number`.in Person
    static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
        gender: PropTypes.oneOf(['男', '女', '其它']),
        hobby: PropTypes.array,
        position: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        }),
        //因为有些时候属性较验比较复杂，
        age: function (props, propName, componentName) {
            if (props[propName] < 0 || props[propName] > 120) {
                throw new Error(`Invalid prop age supplied to ${componentName}, expected age between 0 and 120 in Person`);
            }
        },
        friendName: function (props, propName, componentName) {
            if (props['hasFriend']) {
                if (!props[propName] || typeof props[propName] != 'string') {
                    throw new Error(`Invalid prop friendName supplied to ${componentName}, expected friendName is not empty when hasFriend is true in Person`);
                }
            }
        }
    }
    constructor(props) {
        super(props);
    }
    handleBlur = (event) => {
        let height = event.target.value;
        if (!height || isNaN(height) || parseFloat(height) < this.props.heightRange.min || parseFloat(height) > this.props.heightRange.max) {
            alert('你输入的身高不合法');
            event.target.value = '';
        }
    }
    render() {
        let { name, age, gender, hobby, position, hasFriend, friendName } = this.props;
        return (
            <table>
                <thead>
                    <tr>
                        <td>姓名</td>
                        <td>年龄</td>
                        <td>性别</td>
                        <td>爱好</td>
                        <td>所在位置</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{name}</td>
                        <td>{age}</td>
                        <td>{gender}</td>
                        <td>{hobby.toString()}</td>
                        <td>{position.toString()}</td>
                    </tr>
                    <tr>
                        <td>请输入你的身高</td>
                        <td><input onBlur={this.handleBlur} /></td>
                    </tr>
                </tbody>
            </table>
        )
    }
}


//Invalid prop `age` of type `string` supplied to `Person`, expected `number`.
let p = {
    name: 'zfpx',
    age: 100,
    hasFriend: false,
    gender: '男',
    hobby: ['football', 'basketball'],
    position: { x: 10, y: 10 },
    heightRange: {
        min: 30,
        max: 250
    }
}