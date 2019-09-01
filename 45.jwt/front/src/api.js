import axios from 'axios';
import history from './history';
axios.interceptors.request.use(config => {
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(res => {
    if (res.data.code != 0) {
        return Promise.reject(res);
    }
    return res;
}, error => {
    if (error.response.status == 401) {
        history.push('/');
    }
    return Promise.reject(error.response.data);
});

export function signin(data) {
    return axios({
        url: 'http://localhost:8080/signin',
        method: 'post',
        data
    }).then(response => {
        let result = response.data;
        let token = result.data.token;
        localStorage.setItem('token', token);
        return result;
    });//data就响应体
}

export function getUser() {
    return axios({
        url: 'http://localhost:8080/user',
        method: 'get'
    }).then(response => response.data);//data就响应体
}