import axios from 'axios';

const http = axios.create({
  // baseURL:'/pmt-api/api/app',
  timeout: 60 * 1000,
});

http.interceptors.request.use((config) => {
  return config;
})

http.interceptors.response.use((resp) => {
  return resp;
});


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