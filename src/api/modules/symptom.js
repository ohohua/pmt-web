import http from '../http';
const baseUrl = '/pmt-api';
export default {
  name: 'symptom',
  /**
   * 获取所有医生信息
   * @returns Promise
   */
  doctorInfo: (data) => http.post(`${baseUrl}/user/role`, data),
  /**
   * 保存病例信息
   * @param {} data 
   * @returns 
   */
  saveSymptom: (data) => http.post(`${baseUrl}/user/save-symptom`, data),
  /**
   * 更新点赞、回答人次的信息
   * @param {username, praiseQuantity | answerNumber} data 
   * @returns 
   */
  updatePraise: (data) => http.put(`${baseUrl}/user/update`, data),
}