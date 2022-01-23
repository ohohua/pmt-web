<script setup>
import symptomHeader from "./components/symptom-header.vue";
import symptomDoctor from "./components/symptom-doctor.vue";
import symptomMessage from "./components/symptom-message.vue";
import symptomDescribe from "./components/symptom-describe.vue";
import { ref, reactive } from "vue";
const headerRef = ref(null);
const params = reactive({
  id: null, // 医生id
  name: null, // 患者name
  phone: null, // 患者电话号码
  blood: null, // 患者血型
  age: null, // 出生日期
  sex: null, // 性别
});
const messageIsActive = ref(false);
const describeActive = ref(false);
const showRight = (id) => {
  if (!messageIsActive.value) {
    headerRef.value.handleStep();
  }
  Object.assign(params, { id: id });
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
}
</script>

<template>
  <div class="pd10 f fd-col h100p">
    <symptom-header ref="headerRef" />

    <div class="f1 h0 mt10 f">
      <symptom-doctor @showRight="showRight" />
      <div class="f fd-col" v-if="messageIsActive" style="width: calc(100% - 460px);">
        <symptom-message
          class="ml10 f1"
          @messageForm="messageForm"
        />
        <symptom-describe v-if="describeActive" class="ml10 mt10 f1" @describe="describe"/>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
