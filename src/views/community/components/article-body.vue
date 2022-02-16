<script setup>
import { ref } from "vue";
import api from "@api";
import articleItem from "./article-item.vue";

const type = ref("NEW");
const comment = ref([]);
const loadComment = () => {
  api.header
    .loadAllComment({
      type: type.value,
    })
    .then((res) => {
      comment.value = res.data;
    })
    .catch((e) => console.log(e));
};
const newHandle = () => {
  type.value = "NEW";
  loadComment();
};
const hotHandle = () => {
  type.value = "HOT";
  loadComment();
};
loadComment();
defineExpose({ loadComment }); // 将该方法暴露给父组件

</script>

<template>
  <n-tabs type="line">
    <n-tab-pane name="hot" tab="最新" @click="newHandle">
      <article-item v-for="it in comment" :key="it.id" :it="it"/>
    </n-tab-pane>
    <n-tab-pane name="new" tab="最热" @click="hotHandle">
    <article-item v-for="it in comment" :key="it.id" :it="it"/>
    </n-tab-pane>
  </n-tabs>
</template>

<style lang="scss">

</style>
