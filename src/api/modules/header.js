import http from '../http';
const baseUrl = '/pmt-api';
export default {
  name: 'header',
  /**
   * 获取用户信息
   * @returns Promise
   */
  userInfo: () => http.get(`${baseUrl}/user`),
  /**
   * 获取医生所属的病人
   * @returns Promise
   */
  underDoc: () => http.get(`${baseUrl}/user/underDoc`), 
  /**
   * 通过病人username获取病例信息
   * @param {username} params 
   * @returns 
   */
  loadByName: (params) => http.get(`${baseUrl}/user/loadByName`, {params}), 
  /**
   * 更改用户信息
   * @param {Object} data 
   * @returns 
   */
  uploadUser: (data) => http.put(`${baseUrl}/user/updateUser`, data), 
}