<script setup>
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

import api from "@api";
const route = useRoute();
const patientMessage = ref({
  name: null,
  sex: null,
  bloodType: null,
  phone: null,
  age: null,
  symptom: null,
});
const loadByName = () => {
  api.header
    .loadByName({ username: route.params.username })
    .then((res) => {
      patientMessage.value = res.data[0];
    })
    .catch((e) => console.log(e));
};

watchEffect(loadByName);
console.log(route.params.username);

const response = ref(null);

const submitHandle = () => {
  api.header
    .saveResponse({response: response.value, username: route.params.username})
    .then((res) => {})
    .catch((e) => console.log(e));
};
</script>

<template>
  <div class="pd10 h100p w100p">
    <n-card class="h100p w100p">
      <n-descriptions
        label-placement="top"
        :title="`${route.params.username}的主述`"
        bordered
        :column="4"
      >
        <n-descriptions-item>
          <template #label>姓名</template>
          {{ patientMessage.name || null }}
        </n-descriptions-item>
        <n-descriptions-item label="性别">{{
          patientMessage.sex || null
        }}</n-descriptions-item>
        <n-descriptions-item label="血型">{{
          patientMessage.bloodType || null
        }}</n-descriptions-item>
        <n-descriptions-item label="电话">{{
          patientMessage.phone || null
        }}</n-descriptions-item>
        <n-descriptions-item label="年龄">{{
          patientMessage.age || null
        }}</n-descriptions-item>
        <n-descriptions-item label="症状" :span="2">{{
          patientMessage.symptom || null
        }}</n-descriptions-item>
      </n-descriptions>

      <div class="w100p f fd-col ai-c">
        <n-input
          v-model:value="response"
          type="textarea"
          placeholder="请输入治疗建议"
          class="mt20"
        />
        <n-button style="width: 300px" class="mt20" @click="submitHandle"
          >提交</n-button
        >
      </div>
    </n-card>
  </div>
</template>

<style lang="scss"></style>
