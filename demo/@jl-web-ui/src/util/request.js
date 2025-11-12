import axios from 'axios';
import { Message } from 'element-ui';
import { storageSet, storageGet } from './index';

// 安全地获取环境变量，兼容浏览器环境
const getEnvVar = (key, defaultValue = '/') => {
  if (typeof VUE_APP_BASE_API !== 'undefined') {
    return VUE_APP_BASE_API;
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key];
  }
  return defaultValue;
};


const isDev = getEnvVar('NODE_ENV') === 'development';

const service = axios.create({
  baseURL: getEnvVar('VUE_APP_BASE_API'),
  withCredentials: false,
});

service.interceptors.request.use(
  (config) => {
    if (config.url.indexOf('http') > -1) config.baseURL = '';
    config.headers['jnpf-origin'] = 'pc';
    const token = storageGet('token');
    if (token) {
      config.headers['Authorization'] = token;
    }
    if (config.method == 'get') {
      config.params = config.data;
    }
    let timestamp = Date.parse(new Date()) / 1000;
    if (config.url.indexOf('?') > -1) {
      config.url += `&n=${timestamp}`;
    } else {
      config.url += `?n=${timestamp}`;
    }
    return config;
  },
  (error) => {
    if (isDev) {
      console.log(error);
    }
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    let config = response.config;
    let url = config.url;
    if (!res.code) {
      Message({
        message: res.result || '请求出错，请重试',
        type: 'error',
        duration: 2000,
        onClose: () => {},
      });
      return;
    }
    if (res.code !== 200) {
      if (url.indexOf('/api/oauth/CurrentUser') > -1) {
        return Promise.reject(new Error(res.msg || 'Error'));
      }

      let token = storageGet('token');
      while (!token && isDev) {
        token = prompt('请手动粘贴token');
      }
      storageSet({ token });

      Message({
        message: res.msg || '请求出错，请重试',
        type: 'error',
        duration: 1500,
      });
      if (url.indexOf('/api/oauth/Login') > -1) return Promise.reject(res);
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    if (isDev) {
      console.log(error);
    }
    Message({
      message: '请求出错，请重试',
      type: 'error',
      duration: 1500,
    });
    return Promise.reject(error);
  }
);

export default service;
