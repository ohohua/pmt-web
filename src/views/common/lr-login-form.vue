<template>
  <n-card
    class="lr-login-form"
    v-if="isActive"
    hoverable
    :class="{ 'bounce-in-top': isActive }"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
  >
    <h2>Login</h2>
    <n-form
      :model="model"
      ref="formRef"
      label-placement="left"
      :rules="loginRule"
      class="lr-login-form__login"
    >
      <n-form-item path="username">
        <n-input
          v-model:value="model.username"
          round
          :maxlength="10"
          placeholder="username"
          clearable
        >
          <template #prefix>
            <n-icon>
              <InprivateAccount16Filled />
            </n-icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="model.password"
          :maxlength="10"
          round
          type="password"
          placeholder="password"
          show-password-on="mousedown"
          clearable
        >
          <template #prefix>
            <n-icon>
              <LockClosed24Filled />
            </n-icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item>
        <n-button @click="handleLogin" type="primary" round style="width: 100%"
          >登录</n-button
        >
      </n-form-item>
    </n-form>

    <template #footer>
      Not a member?
      <n-button text type="primary">Create Account</n-button>
    </template>
  </n-card>

  <div v-else @click="handleOpenLogin" class="call-dragon">login</div>
</template>

<script setup>
import api from "@/api";
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { loginRule } from "@consts/index";
import { LockClosed24Filled, InprivateAccount16Filled } from "@vicons/fluent";
import { useRouter } from "vue-router";
import { encryp } from '@utils/index'
const router = useRouter();
const formRef = ref(null);
const message = useMessage();
const model = ref({
  username: "admin",
  password: "123456",
});
const isActive = ref(false);
const handleOpenLogin = () => {
  isActive.value = true;
};
const handleLogin = () => {
  const params = {
    username: model.value.username,
    password: encryp('1234123412ABCDEF','1234123412ABCDEF',model.value.password)
  };
  formRef.value.validate((errors) => {
    if (!errors) {
      api["login-page"]
        .login(params)
        .then((res) => {
          message.success("登录成功！");
          window.localStorage.setItem('COMMAND_CENTER_token', res.data.token);
          router.push({ name: "index" });
        })
        .catch((e) => {
          console.log(e);
          message.error(e.error.response.data.data.error || '登录失败！')
        });
    }
  });
};
</script>

<style lang="scss">
.lr-login-form {
  width: 400px;
  margin: 180px auto;
  h2 {
    text-align: center;
    margin-bottom: 50px;
  }
  .n-card__footer {
    text-align: center;
  }
}

.call-dragon {
  width: 100px;
  height: 100px;
  background-color: royalblue;
  border-radius: 50px;
  text-align: center;
  line-height: 100px;
  color: #ffffff;
  margin: 180px auto;
}
</style>
