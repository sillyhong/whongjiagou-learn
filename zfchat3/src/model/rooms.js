import roomsService from '../service/rooms';
export default {
    namespace: 'rooms',
    state: {
        rooms: [],
        keyword: ''
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname == '/rooms') {
                    dispatch({ type: 'getAllRooms' });
                }
            });
        }
    },
    reducers: {
        changeKeyword(state, action) {
            return { ...state, keyword: action.payload };
        },
        roomAdded(state, { payload }) {
            return { ...state, rooms: [...state.rooms, payload] };
        },
        allRooms(state, { payload: rooms }) {
            debugger;
            return { ...state, rooms };
        }
    },
    effects: {
        *getAllRooms({ }, { put, call }) {
            const { code, data: rooms } = yield call(roomsService.getAllRooms);
            if (code == 0) {
                yield put({ type: 'allRooms', payload: rooms });
            }
        },
        *createRoom({ payload: name }, { put, select, call }) {
            const { code, data: room } = yield call(roomsService.createRoom, { name });
            if (code == 0) {
                yield put({ type: 'roomAdded', payload: room });
            }
        }
    }
}