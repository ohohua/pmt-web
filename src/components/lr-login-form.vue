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
    <h2>Sychological Login</h2>
    <n-form
      :model="model"
      ref="formRef"
      label-placement="left"
      :rules="loginRule"
      class="lr-login-form__login"
    >
      <n-form-item path="account">
        <n-input
          v-model:value="model.account"
          round
          :maxlength="10"
          placeholder="account"
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
import { useMessage } from 'naive-ui';
import { loginRule } from "@consts/index";
import { LockClosed24Filled, InprivateAccount16Filled } from "@vicons/fluent";


const formRef = ref(null);
const message = useMessage()
const model = ref({
  account: "",
  password: "",
});
const isActive = ref(false);
const handleOpenLogin = () => {
  isActive.value = true;
};
const handleLogin = () => {
  // api["login-page"]
  //   .login()
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //   });

  formRef.value.validate((errors) => {
    if (!errors) {
      message.success("Valid");
      isActive.value = false;
    } else {
      console.log(errors);
      message.error("Invalid");
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

.bounce-in-top {
  animation: bounce-in-top 1s both;
}
.slide-out-bck-center {
  animation: slide-out-bck-center 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
    both;
}
@keyframes bounce-in-top {
  0% {
    transform: translateY(-500px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {
    transform: translateY(0);
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateY(-65px);
    animation-timing-function: ease-in;
  }
  72% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateY(-28px);
    animation-timing-function: ease-in;
  }
  90% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
  95% {
    transform: translateY(-8px);
    animation-timing-function: ease-in;
  }
  100% {
    transform: translateY(0);
    animation-timing-function: ease-out;
  }
}
@keyframes slide-out-bck-center {
  0% {
    transform: translateZ(0);
    opacity: 1;
  }
  100% {
    transform: translateZ(-1100px);
    opacity: 0;
  }
}
</style>
