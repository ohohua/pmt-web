<script setup>
import symptomHeader from "./components/symptom-header.vue";
import symptomDoctor from "./components/symptom-doctor.vue";
import symptomMessage from "./components/symptom-message.vue";
import symptomDescribe from "./components/symptom-describe.vue";
import { useMessage } from 'naive-ui';
import { ref, reactive } from "vue";
import api from "@api";
import { pinia } from '@store/index';

const store = pinia.useUserStore();
const message = useMessage();
const headerRef = ref(null);
const params = reactive({
  username: null, // 用户账号
  doctorUsername: null, // 医生账号
  name: null, // 患者name
  phone: null, // 患者电话号码
  bloodType: null, // 患者血型
  age: null, // 出生日期
  sex: null, // 性别
});
const messageIsActive = ref(false);
const describeActive = ref(false);
const showRight = (doctorUsername) => {
  if (!messageIsActive.value) {
    headerRef.value.handleStep();
  }
  Object.assign(params, { doctorUsername: doctorUsername });
  messageIsActive.value = true;
};
const messageForm = (message) => {
  if (!describeActive.value) {
    headerRef.value.handleStep();
  }
  Object.assign(params, message);
  describeActive.value = true;
};
const describe = (describe) => {
  Object.assign(params, describe);
  headerRef.value.handleStep();
  saveSymptom();
};
const saveSymptom = () => {
  params.username = store.account;
  api.symptom
    .saveSymptom(params)
    .then((res) => {
      message.success('保存成功！')
    })
    .catch((e) => console.error(e));
};
</script>

<template>
  <div class="pd10 f fd-col h100p">
    <symptom-header ref="headerRef" />

    <div class="f1 h0 mt10 f">
      <symptom-doctor @showRight="showRight" />
      <div
        class="f fd-col"
        v-if="messageIsActive"
        style="width: calc(100% - 460px)"
      >
        <symptom-message class="ml10 f1" @messageForm="messageForm" />
        <symptom-describe
          v-if="describeActive"
          class="ml10 mt10 f1"
          @describe="describe"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
