<template>
  <div class="pd10">
    <n-card class="mt10" title="修改个人信息">
      <n-spin :show="show">
        <div class="f">
          <div class="f fd-col" style="text-align: center">
            <n-avatar round :size="150" :src="store.avatar" />
            <n-upload
              action="/pmt-api/user/upload"
              :headers="header"
              @finish="handleFinish"
            >
              <n-button class="mt10">上传头像</n-button>
            </n-upload>
          </div>
          <n-form
            class="ml40"
            :model="form"
            :rules="userRule"
            style="width: 500px"
            ref="formRef"
          >
            <n-form-item label="用户名" path="username">
              <n-input v-model:value="form.username" clearable></n-input>
            </n-form-item>
            <n-form-item label="昵称" path="nickname">
              <n-input v-model:value="form.nickname" clearable></n-input>
            </n-form-item>
            <n-form-item>
              <n-button @click="uploadUser">提交</n-button>
            </n-form-item>
          </n-form>
        </div>
      </n-spin>
    </n-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import api from "@api";
import { pinia } from "@store/index.js";
import { userRule } from "@consts/index.js";

const store = pinia.useUserStore();
const form = reactive({
  username: store.account,
  nickname: store.nickname,
});
const formRef = ref(null);
const show = ref(false);
const header = reactive({
  token: window.sessionStorage.getItem("COMMAND_CENTER_token"),
});
// 上传完成回调
const handleFinish = () => {
  store.loadProfileMessage();
};
const uploadUser = () => {
  formRef.value.validate((errors) => {
    if (!errors) {
      show.value = true;
      api.header
        .uploadUser(form)
        .then((res) => {
          store.loadProfileMessage();
          show.value = false;
        })
        .catch((e) => console.log(e));
    }
  });
};
</script>

<style lang="scss"></style>
