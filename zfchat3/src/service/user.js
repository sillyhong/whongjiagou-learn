import request from '../utils/request';
function login(data) {
    return request('http://localhost:7001/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}
function validate(data) {
    return request('http://localhost:7001/validate', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}
export default {
    login,
    validate
}