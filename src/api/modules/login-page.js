import http from '../http';
const baseUrl = '/pmt-api';
export default {
  name: 'login-page',
  login: (data) => http.post(`${baseUrl}/login`, data),
}