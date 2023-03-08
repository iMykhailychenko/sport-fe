import axios from 'axios';

import { LogInResponse } from '../query/auth/auth.type';

const AUTH_KEY = 'jwt-auth-key';

export const publicApi = axios.create({
    baseURL: 'http://70.34.201.18:3001',
    // baseURL: 'http://0.0.0.0:3001',
});

export const privateApi = axios.create({
    baseURL: 'http://70.34.201.18:3001',
    // baseURL: 'http://0.0.0.0:3001',
});

export const setToken = (data: LogInResponse): void => {
    try {
        localStorage.setItem(AUTH_KEY, JSON.stringify(data));
        privateApi.defaults.headers.Authorization = `${data.tokenType} ${data.accessToken}`;
    } catch (error) {
        console.log(error);
        console.log('Error in setToken');
    }
};

export const refreshToken = (): boolean => {
    try {
        const json = localStorage.getItem(AUTH_KEY);
        if (!json) return false;

        const data: LogInResponse = JSON.parse(json);
        if (!data) return false;

        privateApi.defaults.headers.Authorization = `${data.tokenType} ${data.accessToken}`;
        return true;
    } catch (error) {
        console.log(error);
        console.log('Error in refreshToken');
        return false;
    }
};

export const removeToken = (): void => {
    try {
        localStorage.setItem(AUTH_KEY, '');
        privateApi.defaults.headers.Authorization = null;
    } catch (error) {
        console.log(error);
        console.log('Error in removeToken');
    }
};
