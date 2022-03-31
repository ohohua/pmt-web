<!-- 问卷调查页面 -->
<template>
  <div class="pd10 f jc-c" style="height: calc(100% - 30px);">
    <quesType v-if="view" @action="actionHandle"/>
    <quesContent v-else @action="actionHandle"/>
  </div>
</template>

<script setup>
import quesContent from "./components/ques-content.vue";
import quesType from "./components/ques-type.vue";
import { ref } from 'vue';

const view = ref(true);
const actionHandle = () => {
  view.value = !view.value;
}
</script>

<style lang="scss"></style>
