import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // 替换为您的API基础URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const get = (url, params) => axiosInstance.get(url, { params });
export const post = (url, data) => axiosInstance.post(url, data);
export const put = (url, data) => axiosInstance.put(url, data);
export const del = (url) => axiosInstance.delete(url);

export default axiosInstance;
