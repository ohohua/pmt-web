<script setup lang="ts">
import { LockClosed24Filled, InprivateAccount16Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { ref, reactive } from "vue";
import { useMessage } from "naive-ui";
import { accountTypeOptions, registerRule } from "@consts/index";
import api from "@api";
import { useRouter } from "vue-router";
const router = useRouter();
const message = useMessage();
const formRef = ref(null);
const model = reactive({
  username: null,
  password: null,
  password_2: null,
  nickname: null,
  role: null,
  avatar: "",
});
const registerHandle = () => {
  formRef.value.validate((err) => {
    if (!err) {
      if (model.password !== model.password_2) {
        message.error("密码不一致！");
        return;
      }
      api["login-page"]
        .register(model)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });
};
const fileList = ref([]);
const backHandle = () => {
  router.push({ name: "login" });
};
</script>

<template>
  <div class="register h100p w100p f ai-c jc-c bg-pan-left">
    <n-card class="w400 card" :bordered="false"  embedded="true">
      <h2 style="color: #ffffff">注册</h2>
      <n-form
        label-placement="left"
        :model="model"
        label-width="auto"
        ref="formRef"
        :rules="registerRule"
        require-mark-placement="right-hanging"
      >
        <n-form-item path="username">
          <n-input
            v-model:value="model.username"
            :maxlength="10"
            clearable
            round
            placeholder="账号"
          >
            <template #prefix>
              <Icon>
                <InprivateAccount16Filled />
              </Icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password" >
          <n-input
            v-model:value="model.password"
            :maxlength="10"
            type="password"
            show-password-on="mousedown"
            clearable
            round
            placeholder="密码"
          >
            <template #prefix>
              <Icon>
                <LockClosed24Filled />
              </Icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item  path="password_2">
          <n-input
            v-model:value="model.password_2"
            :maxlength="10"
            type="password"
            show-password-on="mousedown"
            clearable
            round
            placeholder="确认密码"
          >
            <template #prefix>
              <Icon>
                <LockClosed24Filled />
              </Icon>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item path="nickname" >
          <n-input
            v-model:value="model.nickname"
            :maxlength="10"
            clearable
            round
            placeholder="昵称"
          >
          </n-input>
        </n-form-item>
        <n-form-item path="role">
          <n-select
            :options="accountTypeOptions"
            v-model:value="model.role"
            clearable
            round
            placeholder="账号类型"
          ></n-select>
        </n-form-item>
        <n-form-item label="资质证明" v-if="model.role === 'doctor'">
          <n-upload
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :default-file-list="fileList"
            list-type="image"
            :create-thumbnail-url="createThumbnailUrl"
          >
            <n-button type="default" class="text-sty">上传文件</n-button>
          </n-upload>
        </n-form-item>
        <n-form-item>
          <div class="w100p f jc-sa">
            <n-button
              type="tertiary"
              @click="backHandle"
              style="width: 150px"
              class="text-sty"
              >返回</n-button
            >
            <n-button
              type="primary"
              @click="registerHandle"
              style="width: 150px"
              >注册</n-button
            >
          </div>
        </n-form-item>
      </n-form>
    </n-card>
  </div>
</template>

<style lang="scss">
.register {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  h2 {
    text-align: center;
    margin-bottom: 50px;
  }
  .card {
    // background-color: transparent;
    background: rgba(221, 226, 223, 0.1);
    box-shadow: 0 0 0 1px rgba(235, 231, 231, 0.3) inset,
      0 0.5em 1em rgb(0 0 0 / 60%);
  }

  .text-sty {
    color: #ffffff;
    &:hover {
      color: rgb(24, 160, 88);
    }
  }

  .n-form-item-label {
    color: #ffffff;
  }
}

.lr-login-form::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  filter: blur(20px);
}
</style>
