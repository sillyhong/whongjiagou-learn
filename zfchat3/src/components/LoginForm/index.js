import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
class LoginForm extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        let user = this.props.form.getFieldsValue();
        //组件中一般不处理业务逻辑，而全部交由model 层处理
        this.props.dispatch({ type: 'user/login', payload: user });
    }
    render() {
        console.log(this.props);
        //获取Input框的修饰方法   是否字段被输入过   获取某个字段的错误 获取所有的字段的错误 
        let { getFieldDecorator, isFieldTouched, getFieldError, getFeildsError } = this.props.form;
        let emailError = isFieldTouched('email') && getFieldError('email');
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    validateStatus={emailError ? 'error' : ''}
                    help={getFieldError('email') || ''}
                >
                    {
                        getFieldDecorator('email', { rules: [{ type: 'email' }, { required: true, message: '请输入邮箱' }] })(
                            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placehold="请输入邮件" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" disabled={!isFieldTouched('email') || emailError}>登录</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(LoginForm);