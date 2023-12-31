import { Message } from '@arco-design/web-vue';
import axios from 'axios';
import router from '@/router';
// const router = Vrouter;

const showDebug = true;

const axiosInstance = axios.create({
  baseURL: 'https://pi.fengxianhub.top:1024',
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
  if (statusCode === 403) {
    router.push('/login').then();
  }
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
  // async (error) => {
  //   console.log('响应错误');
  //   Message.error('网络不佳，请稍后重试');
  //   return Promise.reject(error);
  // }
  function axiosRetryInterceptor (res) {
    console.log('重发1');
    const config = res.config;
    // 如果配置不存在或重试属性未设置，抛出promise错误
    if (!config || !config.retry) return Promise.reject(res);
    // 设置一个变量记录重新请求的次数
    config.retryCount = config.retryCount || 0;
    // 检查重新请求的次数是否超过我们设定的请求次数
    if (config.retryCount >= config.retry) {
      return Promise.reject(res);
    }
    // 重新请求的次数自增
    config.retryCount += 1;
    // 创建新的Promise来处理重新请求的间隙
    console.log('重发2');
    const back = new Promise(function (resolve) {
      console.log('接口' + config.url + '请求超时，重新请求');
      setTimeout(function () {
        resolve();
      }, config.retryInterval || 1);
    });
    // 返回axios的实体，重试请求
    return back.then(function () {
      return axiosInstance(config);
    });
  }
);
export default axiosInstance;
