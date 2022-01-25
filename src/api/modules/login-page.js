import http from '../http';
const baseUrl = '/pmt-api';
export default {
  name: 'login-page',
  /**
   * @param {object} data 
   * @returns Promise
   */
  login: (data) => http.post(`${baseUrl}/auth/login`, data),
  /**
   * null
   * @returns Promise
   */
  userInfo: () => http.get(`${baseUrl}/auth`),
}