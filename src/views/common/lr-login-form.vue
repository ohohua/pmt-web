<template>
  <n-card
    class="lr-login-form bounce-in-top"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    :bordered="false"
  >
    <h2 style="color: #FFFFFF;">登录</h2>
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
          clearable
          placeholder="账号"
        >
          <template #prefix>
            <Icon>
              <InprivateAccount16Filled />
            </Icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item path="password">
        <n-input
          v-model:value="model.password"
          :maxlength="10"
          round
          type="password"
          show-password-on="mousedown"
          clearable
          placeholder="密码"
        >
          <template #prefix>
            <Icon>
              <LockClosed24Filled />
            </Icon>
          </template>
        </n-input>
      </n-form-item>
      <n-form-item>
        <n-button @click="handleLogin"  round style="width: 100%; " class="text-sty"
          >登录</n-button
        >
      </n-form-item>
    </n-form>

    <template #footer>
      <span style="color: #FFFFFF;">Not a member ？</span>
      <n-button text type="primary" @click="register">Create Account</n-button>
    </template>
  </n-card>
</template>

<script setup>
import api from "@/api";
import { ref, watch } from "vue";
import { useMessage } from "naive-ui";
import { loginRule } from "@consts/index";
import { LockClosed24Filled, InprivateAccount16Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { useRouter } from "vue-router";
import { encryp } from "@utils/index";

const router = useRouter();
const formRef = ref(null);
const message = useMessage();
const model = ref({
  username: "",
  password: "",
});

const handleLogin = () => {
  const params = {
    username: model.value.username,
    password: encryp(
      "1234123412ABCDEF",
      "1234123412ABCDEF",
      model.value.password
    ),
  };
  formRef.value.validate((errors) => {
    if (!errors) {
      api["login-page"]
        .login(params)
        .then((res) => {
          message.success("登录成功！");
          window.sessionStorage.setItem("COMMAND_CENTER_token", res.data.token);
          router.push({ name: "index" });
        })
        .catch((e) => {
          console.log(e);
          message.error(e.error.response.data.data.error || "登录失败！");
        });
    }
  });
};

const register = () => {
  router.push({ name: "register" });
};

</script>

<style lang="scss">
.lr-login-form {
  width: 400px;
  background: rgba(221, 226, 223, 0.1);
  box-shadow: 0 0 0 1px rgba(235, 231, 231, 0.3) inset, 0 0.5em 1em rgb(0 0 0 / 60%);
  h2 {
    text-align: center;
    margin-bottom: 50px;
  }
  .n-card__footer {
    text-align: center;
  }

    .text-sty {
    color: #FFFFFF;
    &:hover {
      color: rgb(24, 160, 88);
    }
  }
}


</style>
