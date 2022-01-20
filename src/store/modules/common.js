import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => ({
    _loading: false,
  }),
  getters: {
    loading() {
      return this._loading;
    }
  },
  actions:{
    loadingStart() {
      this._loading = true;
    },
    loadingFinish() {
      this._loading = false;
    }
  }
})