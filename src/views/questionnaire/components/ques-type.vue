<template>
  <n-card
    title="心理测试题目一"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    class="ques-type"
  >
    <template #header-extra> time （can pause） </template>
    题目内容
    <template #footer >
      <template class="f jc-fe">
        <n-space>
          <n-button type="warning" style="width: 100px">提前交卷</n-button>
          <n-button type="primary" style="width: 100px">下 一 题</n-button>
        </n-space>
      </template>
    </template>
    <template #action> 答题卡 </template>
  </n-card>
</template>

<script setup></script>

<style lang="scss">
.ques-type {
  width: 1000px;
  margin: 0 10px 10px 0;
}
</style>
