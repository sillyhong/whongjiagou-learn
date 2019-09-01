import request from '../utils/request';
function createRoom(data) {
    return request('http://localhost:7001/createRoom', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}
function getAllRooms(data) {
    return request('http://localhost:7001/getAllRooms', {
        method: 'GET'
    });
}
export default {
    createRoom,
    getAllRooms
}