import http from '../http';
const baseUrl = '/pmt-api';
export default {
  name: 'questionnaire',
  /**
   * 获取题目
   * @returns Promise
   */
  allSubject: () => http.get(`${baseUrl}/subject`),

  /**
   * 提交回答问题情况
   * {titleId, ansFromUser}
   * @param {object} data 
   * @returns 
   */
  submitAns: (data) => http.post(`${baseUrl}/subject`, data),
  
  /**
   * 获取用户的成绩
   * @returns Promise
   */
  loadGrade: () => http.get(`${baseUrl}/subject/loadGrade`),
}