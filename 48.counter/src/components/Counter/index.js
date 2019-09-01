import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';
//在dva里内置了cssmodules
class Counter extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.record}>
                    {this.props.home.name}最高分:{this.props.count.record}
                </div>
                <div className={styles.current}>
                    {this.props.count.current}
                </div>
                <div className={styles.button}>
                    <button onClick={() => this.props.dispatch({ type: 'count/add' })}>+</button>
                </div>
            </div>
        )
    }
}
export default connect(
    state => state
)(Counter);