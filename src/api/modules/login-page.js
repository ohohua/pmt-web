import http from '../http';
const baseUrl = '/pmt-api';
export default {
  name: 'login-page',
  login: () => http.get(`${baseUrl}`),
}