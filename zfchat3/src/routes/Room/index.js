import React, { Component } from 'react';
import { Layout, Input, Row, Col, Icon, List, Card, Avatar, Badge, Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Header from '../../components/Header';
import ChatForm from '../../components/ChatForm';
class Room extends Component {
    componentDidUpdate() {
        this.scroll.scrollTop = this.scroll.scrollHeight;
    }
    render() {
        return (
            <Layout>
                <Header />
                <Layout.Content>
                    <Row>
                        <Col offset={4} span={16}>
                            <div
                                ref={ref => this.scroll = ref}
                                style={{
                                    minHeight: '200px',
                                    maxHeight: '400px',
                                    overflow: 'auto'
                                }}
                            >
                                <List
                                    itemLayout="horizontal"
                                    dataSource={this.props.messages}
                                    renderItem={message => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src={message.user.avatar} />}
                                                title={message.user.name}
                                                description={message.user.email}
                                            />
                                            <div>{message.content}</div>
                                        </List.Item>
                                    )}
                                />
                            </div>


                            <ChatForm dispatch={this.props.dispatch} />
                        </Col>
                    </Row>

                </Layout.Content>
            </Layout >
        )
    }
}
export default connect(
    state => state.room
)(Room);