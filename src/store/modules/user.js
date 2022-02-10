import { defineStore } from 'pinia';
import api from '@api';

export const useUserStore = defineStore('user', {
  state: () => ({
    _account: null,
    _role: null, // root | patient | doctor
    _nickname: null,
    _avatar: null,
    _doctor: {
      _praiseQuantity: null, // 点赞数量
      _answerNumber: null, // 回答数量
      _isNew: false, // 是否是新人
    }
  }),
  getters: {
    account() {
      return this._account;
    },
    role() {
      return this._role;
    },
    nickname() {
      return this._nickname;
    },
    url() {
      return this._avatar;
    },
    doctor() {
      return this._doctor;
    }
  },
  actions: {
    loadProfileMessage() {
      api.header.userInfo().then(res => {
        this._account = res.data.username;
        this._nickname = res.data.nickname;
        this._role = res.data.role;
        this._avatar = res.data.avatar;
        this._doctor._praiseQuantity = res.data.praiseQuantity;
        this._doctor._answerNumber = res.data.answerNumber;
        this._doctor._isNew = res.data.isNew;
      }).catch(e => {
        console.log(e);
      })
    }
  }
})