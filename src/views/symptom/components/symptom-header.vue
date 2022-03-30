<script setup>
import { ref } from "vue";
const current = ref(1);
const handleStep = () => {
  if (current.value === null) current.value = 1;
  else if (current.value >= 4) return;
  else current.value++;
};
// setup语法中，必须这样暴露，父组件中的ref才能访问到
defineExpose({
  handleStep,
})
</script>
<template>
  <n-card hoverable>
    <n-steps :current="current" size="small" style="width: 500px; margin: 0 auto;">
      <n-step title="选择医生"/>
      <n-step title="填写信息"/>
      <n-step title="描述症状"/>
      <n-step title="提交"/>
    </n-steps>
  </n-card>
</template>
<style lang="scss">
</style>
