import axios from 'axios';

type methodType = 'POST' | 'GET' | 'PUT' | 'DELETE';

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token: string | null) => {
    if (token !== null) {
        window.localStorage.setItem('auth_token', token);
    } else {
        window.localStorage.removeItem('auth_token');
    }
};

axios.defaults.baseURL = `http://localhost:8080`;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.maxRedirects = 0;

export const request = (method: methodType, url: string, data: unknown) => {
    let headers = {};
    if (url !== '/sign-in' && getAuthToken() !== null && getAuthToken() !== 'null') {
        headers = { Authorization: `Bearer ${getAuthToken()}` };
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data,
    });
};
