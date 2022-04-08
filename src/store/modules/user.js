import { defineStore } from 'pinia';
import api from '@api';
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  SettingsSharp as Settings,
} from "@vicons/ionicons5";
import { h } from "vue";
import { NIcon } from "naive-ui";

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon),
    });
  };
};
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
    },
    _list: [
      {
        label: "个人中心",
        key: "profile",
        icon: renderIcon(UserIcon),
      },
      {
        label: "个人设置",
        key: "editProfile",
        icon: renderIcon(EditIcon),
      },
      {
        label: "退出登录",
        key: "logout",
        icon: renderIcon(LogoutIcon),
      },
    ]
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
    avatar() {
      if (!this._avatar) {
        return 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg';
      } else
        return this._avatar;
    },
    doctor() {
      return this._doctor;
    },
    list() {
      return this._list;
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
        if (res.data.role === 'root') {
          this._list = [
            {
              label: "个人中心",
              key: "profile",
              icon: renderIcon(UserIcon),
            },
            {
              label: "个人设置",
              key: "editProfile",
              icon: renderIcon(EditIcon),
            },
            {
              label: "管理后台",
              key: "settings",
              icon: renderIcon(Settings),
            },
            {
              label: "退出登录",
              key: "logout",
              icon: renderIcon(LogoutIcon),
            },
          ];
        } else {
          this._list = [
            {
              label: "个人中心",
              key: "profile",
              icon: renderIcon(UserIcon),
            },
            {
              label: "个人设置",
              key: "editProfile",
              icon: renderIcon(EditIcon),
            },
            {
              label: "退出登录",
              key: "logout",
              icon: renderIcon(LogoutIcon),
            },
          ]
        }
      }).catch(e => {
        console.log(e);
      })
    }
  }
})