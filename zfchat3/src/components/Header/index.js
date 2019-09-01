import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'dva/router';
export default class Header extends Component {
    render() {
        return (
            <Layout.Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["login"]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="login">
                        <Link to="/"><Icon type="login" />首页</Link>
                    </Menu.Item>
                    <Menu.Item key="rooms">
                        <Link to="/rooms"><Icon type="home" />房间列表</Link>
                    </Menu.Item>
                </Menu>
            </Layout.Header>
        )
    }
}