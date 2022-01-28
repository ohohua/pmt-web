<script setup>
import { IosNotificationsOutline as NoticeIcon } from "@vicons/ionicons4";
import { dropdownMenuOptions } from "@consts/index.js";
import { useRouter } from "vue-router";
import todoList from './header-right/todo-list.vue'
import api from '@api';
import { reactive } from 'vue';
import { pinia } from '@store/index.js';

const store = pinia.useUserStore();
const emit = defineEmits(['changeMenu']);
const router = useRouter();
const src = "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg";
const handleSelect = (val) => {
  if(val === 'editProfile') {
    emit('changeMenu');
    router.push({name: 'editProfile'})
  }
  if(val === 'profile') {
    emit('changeMenu');
    router.push({name: 'profile'})
  }
  if(val === 'logout') {
    router.push({name: 'login'});
    window.sessionStorage.clear();
  }
};
const message = reactive({
  src: null,
  nickname: null,
})
const profileMessage = () => {
  api.header.userInfo().then(res => {
    message.nickname = res.data.nickname;
    // message.value = res.data.src;
  }).catch(e => {
    console.log(e);
  })
};
profileMessage()
</script>

<template>
  <div class="f jc-sb" style="width: 150px">
    <n-popover trigger="click" :show-arrow="false" placement="bottom-end">
      <template #trigger>
        <n-badge :value="1" :max="99" class="cp">
          <NoticeIcon style="width: 22px" />
        </n-badge>
      </template>
      <n-tabs type="line" size="small">
        <n-tab-pane name="notice" tab="通知">通知</n-tab-pane>
        <n-tab-pane name="message" tab="消息">消息</n-tab-pane>
        <n-tab-pane name="todo" tab="待办" v-if="store.role !== 'patient'"><todoList/></n-tab-pane>
      </n-tabs>
    </n-popover>

    <n-dropdown
      trigger="hover"
      @select="handleSelect"
      :options="dropdownMenuOptions"
    >
      <div class="f ai-c cp">
        <n-avatar size="small" round :src="src" />
        <span class="ml12">{{ message.nickname  }}</span>
      </div>
    </n-dropdown>
  </div>
</template>

<style lang="scss"></style>
