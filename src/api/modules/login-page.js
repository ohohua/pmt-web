import http from '../http';
const baseUrl = '/pmt-api';
export default {
  name: 'login-page',
  /**
   * 登录
   * @param {object} data 
   * @returns Promise
   */
  login: (data) => http.post(`${baseUrl}/auth/login`, data),
  /**
   * 注册
   * @param {Object} data 
   * @returns Promise
   */
  register: (data) => http.post(`${baseUrl}/auth/register`, data),
}