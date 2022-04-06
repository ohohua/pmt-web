import http from '../http';
const baseUrl = '/pmt-api';
export default {
  name: '后台所有接口',
  /**
   * 获取所有用户
   * @returns Promise
   */
  loadAllUser: (params) => http.get(`${baseUrl}/user/loadAllUser`, { params }),

}