import { routes } from '@/routes';
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

const getUnauthenticatedRoutes = () => routes.filter(route => route.unauthenticated).map(route => route.path);

export const OAuth2 = (service: string) => {
    window.location.href = `http://${import.meta.env.VITE_PLATFORM_URL}:${import.meta.env.VITE_BACKEND_PORT}/oauth2/authorization/${service.toLowerCase()}`;
};

export const request = (method: methodType, url: string, data: unknown) => {
    let headers = {};
    if (!getUnauthenticatedRoutes().includes(url) && getAuthToken() !== null && getAuthToken() !== 'null') {
        headers = { Authorization: `Bearer ${getAuthToken()}` };
    }

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data,
    });
};
