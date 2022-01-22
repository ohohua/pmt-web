import { h } from 'vue'
import { NIcon } from 'naive-ui'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

export const loginRule = {
  username: {
    required: true,
    message: "请输入账号",
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: ["input", "blur"],
  },
};

export const dropdownMenuOptions = [
  {
    label: '个人中心',
    key: 'profile',
    icon: renderIcon(UserIcon)
  },
  {
    label: '个人设置',
    key: 'editProfile',
    icon: renderIcon(EditIcon)
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon(LogoutIcon)
  }
]

export const messageRule = {
  name: {
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  },
  age: {
    required: true,
    message: '请输入年龄',
    trigger: 'blur'
  }
}

export const bloodOptions = [
  {
    label: 'A型',
    value: '1'
  },
  {
    label: 'B型',
    value: '2'
  },
  {
    label: 'O型',
    value: '3'
  },
  {
    label: 'AB型',
    value: '4'
  },
  {
    label: '不想',
    value: '0'
  },
]