import axios from 'axios';

const http = axios.create({
  timeout: 60 * 1000,
});

const catchError = (error) => {
  error = error || {};
  const data = error.data || {};
  if (error) {
    if (error instanceof axios.Cancel) {
      console.debug('cancel =>', error.message);
    } else if (error.status === 401 || data.code === 401) {
      console.error('Authentication failed...');
    }
  }
  return Promise.reject({ error, code: data.code || -1, msg: data.msg || error.message || '请求失败' });
};

http.interceptors.request.use((config) => {
  config.headers['token'] = sessionStorage.getItem('COMMAND_CENTER_token');
  return config;
})

http.interceptors.response.use((res) => {
  // if(res.status !== 200 && res.status !== 201) {
  //   return catchError(res);
  // }
  const data = res.data || {};

  // if(data.code !== 0) {
  //   return catchError(res);
  // }
  return data;
}, catchError);


const post = (url, data, config) => http.post(url, data, config);

const put = (url, data, config) => http.put(url, data, config);

const get = (url, config) => http.get(url, config);

const del = (url, config) => http.delete(url, config);

const head = (url, config) => http.head(url, config);

const options = (url, config) => http.options(url, config);

const patch = (url, data, config) => http.patch(url, data, config);


export default {
  post,
  get,
  put,
  del,
  patch,
  head,
  options,
};