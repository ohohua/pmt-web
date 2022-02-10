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
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    message: '请选择出生日期',
  },
  phone: {
    required: true,
    message: '请输入电话号码',
    trigger: 'blur'
  },
  bloodType: {
    required: true,
    message: '请选择血型',
    trigger: ['blur', 'change']
  },
  sex: {
    required: true,
    message: '请选择性别',
    trigger: 'blur'
  }
}

export const bloodOptions = [
  {
    label: 'A型',
    value: 'A型'
  },
  {
    label: 'B型',
    value: 'B型'
  },
  {
    label: 'O型',
    value: 'O型'
  },
  {
    label: 'AB型',
    value: 'AB型'
  },
  {
    label: '不详',
    value: '不详'
  },
]

export const accountTypeOptions = [
  {
    label: '患者',
    value: 'patient',
  },
  {
    label: '医生',
    value: 'doctor',
  }
];

export const registerRule = {
  username: {
    required: true,
    message: '请输入账号',
    trigger: 'blur'
  },
  password: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  },
  password_2: {
    required: true,
    message: '请输入密码',
    trigger: 'blur'
  },
  nickname: {
    required: true,
    message: '请输入昵称',
    trigger: 'blur'
  },
  role: {
    required: true,
    message: '请选择账号类型',
    trigger: ['blur', 'change']
  },
}

export const userRule = {
  username: {
    required: true,
    message: '请输入用户名',
    trigger: 'blur'
  },
  nickname: {
    required: true,
    message: '请输入昵称',
    trigger: 'blur'
  },
}