import http from '../http';
const baseUrl = '/pmt-api';
export default {
  name: 'questionnaire',
  /**
   * 获取题目
   * @param {object} data 
   * @returns Promise
   */
  allSubject: () => http.get(`${baseUrl}/subject`),
}