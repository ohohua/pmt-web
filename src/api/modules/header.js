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
  loadByName: (params) => http.get(`${baseUrl}/user/loadByName`, { params }),
  /**
   * 更改用户信息
   * @param {Object} data 
   * @returns 
   */
  uploadUser: (data) => http.put(`${baseUrl}/user/updateUser`, data),
  /**
   * 
   * @param {*} data 
   * @returns 
   */
  saveResponse: (data) => http.post(`${baseUrl}/user/saveResponse`, data),
  /**
   * 保存评论信息 
   * @param {content:string, 
   *         praiseQuantity: number 
   *        } data 
   * @returns 
   */
  saveCommunity: (data) => http.post(`${baseUrl}/community/save`, data),

  /**
   * 保存对应父评论的子评论
   * @param {community: number, content: string} data 
   * @returns 
   */
  subSave: (data) => http.post(`${baseUrl}/community/subSave`, data),
  /**
   * 根据最新 | 最热去获取用户的评论
   * @param {sort: DESC | ASC} params 
   * @returns 【】
   */
  loadAllComment: (params) => http.get(`${baseUrl}/community`, { params }),
  /**
 * 更新点赞
 * @param {userId, praiseQuantity} data 
 * @returns 
 */
  updatePraise: (data) => http.put(`${baseUrl}/community`, data),
}