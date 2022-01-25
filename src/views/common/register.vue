<script setup>
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
  <div class="register h100p w100p f ai-c jc-c">
    <n-card class="w500">
      <h2>Register</h2>
      <n-form
        label-placement="left"
        :model="model"
        label-width="auto"
        ref="formRef"
        :rules="registerRule"
        require-mark-placement="right-hanging"
      >
        <n-form-item path="username" label="账号">
          <n-input v-model:value="model.username" :maxlength="10" clearable>
            <template #prefix>
              <Icon>
                <InprivateAccount16Filled />
              </Icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input
            v-model:value="model.password"
            :maxlength="10"
            type="password"
            show-password-on="mousedown"
            clearable
          >
            <template #prefix>
              <Icon>
                <LockClosed24Filled />
              </Icon>
            </template>
          </n-input>
        </n-form-item>
        <n-form-item label="确认密码" path="password_2">
          <n-input
            v-model:value="model.password_2"
            :maxlength="10"
            type="password"
            show-password-on="mousedown"
            clearable
          >
            <template #prefix>
              <Icon>
                <LockClosed24Filled />
              </Icon>
            </template>
          </n-input>
        </n-form-item>

        <n-form-item path="nickname" label="昵称">
          <n-input v-model:value="model.nickname" :maxlength="10" clearable>
          </n-input>
        </n-form-item>
        <n-form-item label="账号类型" path="role">
          <n-select
            :options="accountTypeOptions"
            v-model:value="model.role"
            clearable
          ></n-select>
        </n-form-item>
        <n-form-item label="资质证明" v-if="model.role === 'doctor'">
          <n-upload
            action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
            :default-file-list="fileList"
            list-type="image"
            :create-thumbnail-url="createThumbnailUrl"
          >
            <n-button>上传文件</n-button>
          </n-upload>
        </n-form-item>
        <n-form-item>
          <div class="w100p f jc-sa">
            <n-button type="tertiary" @click="backHandle" style="width: 150px"
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
  h2 {
    text-align: center;
    margin-bottom: 50px;
  }
}
</style>
