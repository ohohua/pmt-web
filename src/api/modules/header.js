import http from '../http';
const baseUrl = '/pmt-api';
export default {
  name: 'header',
  /**
   * null
   * @returns Promise
   */
  userInfo: () => http.get(`${baseUrl}/user`),
}