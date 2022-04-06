import { ref, toRefs } from 'vue';
import { pinia } from '@store/index'
import { h } from 'vue'
import { NIcon } from 'naive-ui'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  SettingsSharp as Settings
} from '@vicons/ionicons5'

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const store = pinia.useUserStore();
// 计时hook
export function useTime() {
  const cur_time = ref('00:00:00');
  const n_sec = ref(0); //秒
  const n_min = ref(0); //分
  const n_hour = ref(0); //时

  function auto_ins() {
    return setInterval(() => {
      let str_sec = n_sec.value;
      let str_min = n_min.value;
      let str_hour = n_hour.value;
      if (n_sec.value < 10) {
        str_sec = "0" + n_sec.value;
      }
      if (n_min.value < 10) {
        str_min = "0" + n_min.value;
      }

      if (n_hour.value < 10) {
        str_hour = "0" + n_hour.value;
      }
      cur_time.value = str_hour + ":" + str_min + ":" + str_sec;
      n_sec.value++;
      if (n_sec.value > 59) {
        n_sec.value = 0;
        n_min.value++;
      }
      if (n_min.value > 59) {
        n_sec.value = 0;
        n_hour.value++;
      }
    }, 1000);
  }
  let timer = auto_ins();


  function pauseTime() {
    clearTimeout(timer);
  }
  function playTime() {
    timer = auto_ins();
  }
  function restart() {
    clearTimeout(timer);
    cur_time.value = '00:00:00';
    n_sec.value = 0; //秒
    n_min.value = 0; //分
    n_hour.value = 0; //时
  }
  return {
    cur_time,
    pause_time: pauseTime,
    play_time: playTime,
    restart_time: restart,
  };
}

export function useList() {
  let dropdownMenuOptions = [
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

  if (store.role === 'root') {
    dropdownMenuOptions = [
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
        label: '管理后台',
        key: 'settings',
        icon: renderIcon(Settings)
      },
      {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(LogoutIcon)
      }
    ]
  }
  return dropdownMenuOptions;
}