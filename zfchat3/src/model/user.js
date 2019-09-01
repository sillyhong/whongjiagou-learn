import userService from '../service/user';
import { routerRedux } from 'dva/router';
export default {
    namespace: 'user',//命名空间
    state: {///初始状态 
        user: null
    },
    reducers: {//处理器
        setUser(state, action) {
            return { ...state, user: action.payload };
        }
    },
    effects: {//副作用函数 payload = user
        *login({ payload }, { put, call }) {
            const { data: token } = yield call(userService.login, payload);
            sessionStorage.setItem('token', token);
            yield put(routerRedux.push('/rooms'));
        },
        *validate({ }, { put, call }) {
            const { code, data: user } = yield call(userService.validate, { token: sessionStorage.getItem('token') });
            if (code == 0) {
                yield put({ type: 'setUser', payload: user });
            } else {
                yield put(routerRedux.push('/'));
            }
        }
    }
}