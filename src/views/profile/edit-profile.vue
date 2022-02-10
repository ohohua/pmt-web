<template>
  <div class="pd10">
    <n-card class="mt10" title="修改个人信息">
      <n-form>
        <n-form-item label="头像">
          <div>
            <n-avatar
              round
              :size="150"
              :src="store.url"
            />
            <n-upload action="/pmt-api/user/upload" :headers="header">
              <n-button>上传头像</n-button>
            </n-upload>
          </div>
        </n-form-item>
        <n-form-item label="用户名">
          <n-input v-model:value="form.username" clearable></n-input>
        </n-form-item>
        <n-form-item label="昵称">
          <n-input v-model:value="form.nickname" clearable></n-input>
        </n-form-item>
        <n-form-item>
          <n-button @click="handleSave">提交</n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "@api";
import { pinia } from "@store/index.js";
const store = pinia.useUserStore();

const form = ref({
  username: null,
  nickname: null,
  avatar: null,
});
const handleSave = () => {
  uploadUser();
};
const header = reactive({
  token: window.sessionStorage.getItem("COMMAND_CENTER_token"),
});
const uploadUser = () => {
  const data = form.value;
  api.header
    .uploadUser(data)
    .then((res) => {})
    .catch((e) => console.log(e));
};
</script>

<style lang="scss"></style>
