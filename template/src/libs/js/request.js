import axios from 'axios';
import config from './config.js';
const {
  apiHost: baseURL
} = config;

const AXIOS = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const request = () => ({
  get(path, data) {
    return AXIOS.get(path, {
      params: data
    });
  },
  delete(path, data) {
    return AXIOS.delete(path, {
      params: data
    });
  },
  post(path, data) {
    return AXIOS.post(path, data);
  }
  // ...
});

// 添加响应拦截器
AXIOS.interceptors.response.use(d => {
  let {
    data
  } = d;
  return data;
}, (error) => {
  return Promise.reject(error);
});
export default request();