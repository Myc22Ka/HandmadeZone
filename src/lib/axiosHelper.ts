/* eslint-disable no-magic-numbers */
import { routes } from '@/routes';
import axios, { Method } from 'axios';

export enum ServerResponseCode {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

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

export interface RequestConfig {
    method: Method;
    url: string;
    data?: unknown;
    params?: unknown;
}

export const request = ({ method, url, data, params }: RequestConfig) => {
    let headers: Record<string, string> = {};

    // Add authorization headers if required
    if (!getUnauthenticatedRoutes().includes(url) && getAuthToken()) {
        headers = { Authorization: `Bearer ${getAuthToken()}` };
    }

    return axios({
        method,
        url,
        headers,
        paramsSerializer: {
            indexes: null,
        },
        ...(method === 'GET' ? { params } : { data }),
    });
};

export const verify = (method: Method, url: string, data: unknown) => {
    const headers = {
        Accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
    };

    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data,
    });
};

// Helper functions for common HTTP methods
export const get = (url: string, params?: unknown) => request({ method: 'GET', url, params });
export const post = (url: string, data?: unknown) => request({ method: 'POST', url, data });
export const put = (url: string, data?: unknown) => request({ method: 'PUT', url, data });
export const del = (url: string, data?: unknown) => request({ method: 'DELETE', url, data });
