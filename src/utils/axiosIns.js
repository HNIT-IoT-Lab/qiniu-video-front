import { Message } from '@arco-design/web-vue';
import axios from 'axios';
// import Vrouter from '@/router';
// const router = Vrouter;

const showDebug = true;

const axiosInstance = axios.create({
  baseURL: 'api',
  timeout: 20 * 1000
});
function printRequestInfo (config) {
  if (showDebug === true) {
    console.groupCollapsed('%c%s %c请求参数', 'color: blue;', config.url, 'color:black');
    console.info('请求全量地址:%s%s', config.baseURL, config.url);
    const requestMethod = config.method;
    const requestHeader = config.headers;
    console.info('请求方法:%s', requestMethod);
    console.info('请求头:%o', requestHeader);
    let data = null;
    if (requestMethod === 'get') {
      data = config.params;
    }
    if (requestMethod === 'post') {
      data = config.data;
    }
    console.info('请求参数:%o', data);
    console.groupEnd();
  }
}
function printResponseInfo (response) {
  if (showDebug === true) {
    console.groupCollapsed('%c%s %c返回参数', 'color: blue;', response.config.url, 'color:black');
    console.info('状态码:%c%s', 'color: blue;', response.status);
    console.info('业务码:%c%s', 'color: blue;', response.data.code);
    console.info('返回值:%o', response.data);
    console.groupEnd();
  }
}
function checkStatusCode (response) {
  const statusCode = response.data.code;
  // console.log('statusCode', statusCode);
  // // if (statusCode === 200) ;
  if (statusCode === -1 || statusCode === 400) {
    Message.error(response.data.msg);
    return Promise.reject(new Error(response.data.msg || 'Error'));
  }
}

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    let authorization = null;
    authorization = localStorage.getItem('token') ? `${localStorage.getItem('token')}` : null;
    config.headers.userToken = authorization;
    printRequestInfo(config);
    return config;
  },
  (error) => {
    console.log('超时');
    return Promise.reject(error);
  }
);
// 添加响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    try {
      const res = checkStatusCode(response);
      if (res) {
        return res;
      }
    } catch (error) {
      console.log('捕获错误');
      console.log(response.data);
    }
    console.log('返回结果');
    printResponseInfo(response);
    return response.data;
  },
  async (error) => {
    console.log('响应错误');
    Message.error('网络不佳，请稍后重试');
    return Promise.reject(error);
  }
);
export default axiosInstance;
