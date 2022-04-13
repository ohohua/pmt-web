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
  /**
   * 加载所有题目
   * @returns Promise
   */
  loadAllSubject: (params) => http.get(`${baseUrl}/subject/loadAllSubject`, { params }),
  /**
   * 删除题目
   */
  delSubject: (data) => http.post(`${baseUrl}/subject/delSubject`, data),
  /**
 * 增加题目
 * @param {object} data 
 * @returns 
 */
  addSubject: (data) => http.post(`${baseUrl}/subject/addSubject`, data),
  /**
   * 更改题目信息
   * @param {object} data 
   * @returns Promise
   */
  updateSubject: (data) => http.post(`${baseUrl}/subject/updateSubject`, data),
}