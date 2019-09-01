import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';
class ChatForm extends Component {
    handleSubmit = (event) => {
        event.preventDefault();
        let message = this.props.form.getFieldsValue();//{content:''}
        //组件中一般不处理业务逻辑，而全部交由model 层处理
        this.props.dispatch({ type: 'room/addMessage', payload: message });
        this.props.form.resetFields();
    }
    render() {
        //获取Input框的修饰方法   是否字段被输入过   获取某个字段的错误 获取所有的字段的错误 
        let { getFieldDecorator, isFieldTouched, getFieldError, getFeildsError } = this.props.form;
        let contentError = isFieldTouched('content') && getFieldError('content');
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item
                    validateStatus={contentError ? 'error' : ''}
                    help={getFieldError('content') || ''}
                >
                    {
                        getFieldDecorator('content', { rules: [{ required: true, message: '请输入内容' }] })(
                            <Input prefix={<Icon type="wechat" style={{ color: 'rgba(0,0,0,.25)' }} />} placehold="请输入内容" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" disabled={!isFieldTouched('content') || contentError}>发言</Button>
                </Form.Item>
            </Form>
        )
    }
}

export default Form.create()(ChatForm);