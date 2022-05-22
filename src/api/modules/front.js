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

  /**
   * 加载所有病例 | 或根据参数加载特定的病例
   * @param {object} params 
   * @returns Promise
   */
  loadAllDisease: (params) => http.get(`${baseUrl}/user/loadAllDisease`, { params }),

  /**
   * 删除病例
   */
  delDisease: (data) => http.post(`${baseUrl}/user/delDisease`, data),

  /**
   * 更改病例信息
   * @param {object} data 
   * @returns Promise
   */
  updateDisease: (data) => http.post(`${baseUrl}/user/updateDisease`, data),
  /**
 * 根据最新 | 最热去获取用户的评论
 * @param 
 * @returns 【】
 */
  loadAllComment: (params = { type: 'NEW' }) => http.get(`${baseUrl}/community`, { params }),
  /**
   * 根据昵称搜索评论
   * @param {nickname} params 
   * @returns 
   */
  searchComment: (params) => http.get(`${baseUrl}/community/search`, { params }),

  /**
   * 根据id删除评论
   * @param {nickname} params 
   * @returns 
   */
  delComment: (data) => http.post(`${baseUrl}/community/del`, data),

  /**
   * 根据id修改评论
   * @param {id} params 
   * @returns 
   */
  updateComment: (data) => http.post(`${baseUrl}/community/update`, data),
}