<template>
  <n-card
    title="心理测试题目一"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    class="ques-content"
  >
    <template #header-extra>
      <div class="cp f ai-c" @click="timeHandle">
        <Icon>
          <pause v-if="condition" />
          <play v-else />
        </Icon>

        <p class="ml10 mt3">{{ cur_time }}</p>
      </div>
    </template>
    题目内容
    <template #footer>
      <template class="f jc-fe">
        <n-space>
          <n-button type="warning" style="width: 100px">提前交卷</n-button>
          <n-button type="primary" style="width: 100px">下 一 题</n-button>
        </n-space>
      </template>
    </template>
    <template #action> 答题卡 </template>
  </n-card>

  <n-modal v-model:show="showModal" :mask-closable="false">
    <n-card
      style="width: 600px;"
      size="huge"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      休息一下吧，下次再做
      <template class="f jc-fe">
        <n-space>
          <n-button secondary type="tertiary" @click="onNegativeClick">下次在做</n-button>
          <n-button type="primary" @click="onPositiveClick">继续做题</n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>

</template>

<script setup>
import { useTime } from "@hooks/index.js";
import { Play48Regular as play, Pause20Regular as pause } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { ref } from "vue";

const { cur_time, pause_time, play_time } = useTime();
// 暂停&开始 标识
const condition = ref(true);

const timeHandle = () => {
  if (condition.value) {
    pause_time();
    showModal.value = true;
    condition.value = false;
  } else {
    play_time();
    condition.value = true;
  }
};

const showModal = ref(false);
const onNegativeClick = () => {
  // showModal.value = false;
};
const onPositiveClick = () => {
  play_time();
  condition.value = true;
  showModal.value = false;
};
</script>

<style lang="scss">
.ques-content {
  width: 1000px;
  margin: 0 10px 10px 0;
}
</style>
