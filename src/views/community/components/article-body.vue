<script setup>
import { ref, watchEffect } from "vue";
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

const handleBeforeLeave = (tabName) => {
  switch (tabName) {
    case "NEW":
      hotHandle();
      return true;
    case "HOT":
      newHandle();
      return true;
  }
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
  <n-tabs type="line" @before-leave="handleBeforeLeave">
    <n-tab-pane name="HOT" tab="最新">
      <article-item v-for="it in comment" :key="it.id" :it="it" />
    </n-tab-pane>
    <n-tab-pane name="NEW" tab="最热">
      <article-item v-for="it in comment" :key="it.id" :it="it" />
    </n-tab-pane>
  </n-tabs>
</template>

<style lang="scss"></style>
