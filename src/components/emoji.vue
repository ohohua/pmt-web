<template>
  <div class="home f fw-w">
    <div
      v-for="(item, index) in faceList"
      :key="index"
      @click="getBrow(index)"
      class="cp"
      style="width: 20px"
    >
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import appData from "@assets/emojis.json";
const emit = defineEmits(['faceEmit'])
const faceList = ref([]); // 保存emoji的数组
const faceContent = () => {
  for (let i in appData) {
    faceList.value.push(appData[i].char);
  }
};
faceContent();
// 获取用户点击之后的标签 ，存放到输入框内
const getBrow = (index) => {
  for (let i in faceList.value) {
    if (index == i) {
      emit('faceEmit', faceList.value[index]);
      return;
    }
  }
};
</script>

<style lang="scss"></style>
