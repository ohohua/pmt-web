<script setup>
import { ref } from "vue";
const current = ref(1);
const handleStep = () => {
  if (current.value === null) current.value = 1;
  else if (current.value >= 4) current.value = null;
  else current.value++;
};
</script>
<template>
  <n-card @click="handleStep" hoverable>
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
