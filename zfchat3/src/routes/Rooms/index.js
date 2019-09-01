import React, { Component } from 'react';
import { Layout, Input, Row, Col, Icon, Card, Avatar, Badge, Button } from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Header from '../../components/Header';
//页面级组件一般是用来跟仓库连接 
class Rooms extends Component {
    handleChange = (event) => {
        let val = event.target.value;
        this.props.dispatch({ type: 'rooms/changeKeyword', payload: val });
    }
    createRoom = event => {
        this.props.dispatch({ type: 'rooms/createRoom', payload: this.props.keyword });
    }
    render() {
        return (
            <Layout>
                <Header />
                <Layout.Content>
                    <Row>
                        <Col offset={6} span={12}>
                            <Input placeholder="请输入关键字"
                                onChange={this.handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        {
                            this.props.rooms.map(room => (
                                <Col span={6} key={room._id}>
                                    <Link to={`/rooms/${room._id}`}>
                                        <Card
                                            title={room.name}
                                            extra={<Badge count={`${room.users ? room.users.length : 0}人`} />}
                                        >
                                            {
                                                room.users && (
                                                    room.users.map(user => (
                                                        <Avatar key={user._id} src={user.avatar} />
                                                    ))
                                                )
                                            }
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        }
                    </Row>
                    <Row>
                        {
                            this.props.rooms.length == 0 && (
                                <Button
                                    onClick={this.createRoom}
                                    type="primary">创建房间</Button>
                            )
                        }
                    </Row>
                </Layout.Content>
            </Layout>
        )
    }
}
export default connect(
    state => (
        {
            keyword: state.rooms.keyword,
            rooms: state.rooms.rooms.filter(room => room.name.indexOf(state.rooms.keyword) != -1)
        }
    )
)(Rooms)