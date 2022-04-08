import http from '../http';
const baseUrl = '/pmt-api';
export default {
  name: '后台所有接口',
  /**
   * 获取所有用户
   * @returns Promise
   */
  loadAllUser: (params) => http.get(`${baseUrl}/user/loadAllUser`, { params }),
  /**
   * 删除用户
   * @param {Array} data 
   * @returns 
   */
  delUser: (data) => http.post(`${baseUrl}/user/del`, data),
  /**
   * 增加用户信息
   * @param {object} data 
   * @returns 
   */
  addUser: (data) => http.post(`${baseUrl}/user/addUser`, data),
  /**
   * 更改用户信息
   * @param {object} data 
   * @returns Promise
   */
  updateUser: (data) => http.post(`${baseUrl}/user/updateUser`, data),
}