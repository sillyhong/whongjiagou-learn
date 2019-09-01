import pathToRegexp from 'path-to-regexp';
export default {
    namespace: 'room',
    state: {
        room: null,
        messages: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {//  /rooms/:id   /rooms/xxxx
                let matched = pathToRegexp('/rooms/:id').exec(pathname);
                if (matched) {
                    let room = matched[1];
                    dispatch({ type: 'setRoom', payload: room });//设置当前房间的ID
                    dispatch({ type: 'user/validate' });//验证用户身份
                    let socket = require('socket.io-client')('http://localhost:7001/', {
                        query: {
                            token: sessionStorage.getItem('token'),
                            room
                        }
                    });
                    socket.on('connect', function () {
                        socket.emit('getAllMessages', room);
                    });
                    socket.on('allMessages', function (messages) {
                        dispatch({ type: 'allMessages', payload: messages });
                    });
                    socket.on('messageAdded', function (message) {
                        dispatch({ type: 'messageAdded', payload: message });
                    });
                    window.socket = socket;
                }
            });
        }
    },
    effects: {
        *addMessage(action, { put, call, select }) {
            let message = action.payload;
            let { user: { user }, room: { room } } = yield select(state => state);
            message.user = user._id;
            message.room = room;
            window.socket.emit('addMessage', message);
        }
    },
    reducers: {
        setRoom(state, action) {
            return { ...state, room: action.payload };
        },
        allMessages(state, { payload: messages }) {
            return { ...state, messages };
        },
        messageAdded(state, { payload: message }) {
            return { ...state, messages: [...state.messages, message] };
        }
    }
}