import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon, Row, Col } from 'antd';
import { Link } from 'dva/router';
import Header from '../../components/Header';
import LoginForm from '../../components/LoginForm';
//页面级组件一般是用来跟仓库连接 
class Login extends Component {
    render() {
        return (
            <Layout>
                <Header />
                <Layout.Content>
                    <Row style={{ marginTop: 50 }}>
                        <Col offset={6} span={12}>
                            <LoginForm dispatch={this.props.dispatch} />
                        </Col>
                    </Row>


                </Layout.Content>
            </Layout>
        )
    }
}
export default connect(
    state => state
)(Login);