import axios, {AxiosRequestConfig} from 'axios';
import {getAuthToken, removeAuthToken, saveAuthToken} from './auth.ts';
import {reAuthToken} from '@/api/auth';
import * as Sentry from "@sentry/react";

export const api = {
  get: <T>(url: string, params?: object, config?: AxiosRequestConfig) =>
    instance.get<T>(url, {
      ...params,
      ...config,
    }),
  post: <T>(url: string, data: any, config?: AxiosRequestConfig) =>
    instance.post<T>(url, data, config),
  patch: <T>(url: string, data: any, config?: AxiosRequestConfig) =>
    instance.patch<T>(url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    instance.delete<T>(url, config),
};

/**
 * Axios instance
 */
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 */
instance.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }

  return config;
});

/**
 * Response interceptor
 */
let temp = false;
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const token = getAuthToken();

    if (token && error.response.status === 401 && !temp) {
      temp = true;
      // Token expired or invalid
      const {refreshToken} = token;

      try {
        const response = await reAuthToken(refreshToken);
        const {access_token, refresh_token} = response.data;

        saveAuthToken(access_token, refresh_token);
      } catch (error) {
        removeAuthToken();
        console.log(error);
      }
    }

    if (error.response.statusText !== 'Unauthorized') {
      Sentry.captureException(error);
    }
    return Promise.reject(error);
  },
);
