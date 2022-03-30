<template>
  <n-modal v-model:show="sureBegin" :mask-closable="false">
    <n-card
      style="width: 600px"
      size="huge"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      确认开启心理测试？
      <template class="f jc-fe">
        <n-space>
          <n-button secondary type="tertiary" @click="abandonHandle"
            >点错了</n-button
          >
          <n-button type="primary" @click="acceptHandle" :loading="loading">
            确认做题
          </n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>

  <n-card
    title="最靠谱的测试"
    :segmented="{
      content: true,
      footer: 'soft',
    }"
    class="ques-content"
    v-if="!sureBegin"
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
    <!-- 题目区域 -->
    <h3>{{ `${i + 1}、 ${subject && subject[i]?.title}` }}</h3>
    <n-radio-group
      v-model:value="subject[i].res"
      name="radiogroup"
      v-if="subject"
      size="large"
      class="mt40"
    >
      <n-space vertical>
        <n-radio-button value="A" class="w900 h50 lh50" >A. {{ subject[i]?.A }}</n-radio-button>
        <n-radio-button value="B" class="w900 h50 lh50">B. {{ subject[i]?.B }}</n-radio-button>
        <n-radio-button value="C" class="w900 h50 lh50">C. {{ subject[i]?.C }}</n-radio-button>
        <n-radio-button value="D" class="w900 h50 lh50">D. {{ subject[i]?.D }}</n-radio-button>
      </n-space>
    </n-radio-group>

    <template #footer>
      <template class="f jc-fe">
        <n-space>
          <n-button type="warning" style="width: 100px" @click="submitAnsHandle"
            >提前交卷</n-button
          >
          <n-button
            type="primary"
            style="width: 100px"
            @click="nextHandle(i + 1 === subject.length)"
            >{{ i + 1 === subject.length ? "交卷" : "下 一 题" }}</n-button
          >
        </n-space>
      </template>
    </template>
    <template #action>
      <n-space>
        <n-button
          v-for="it in subject"
          circle
          :type="i + 1 === it.id ? 'primary' : 'tertiary'"
          :key="it.id"
          @click="numberHandle(it.id)"
          :disabled="i + 1 < it.id"
          >{{ it.id }}</n-button
        >
      </n-space>
    </template>
  </n-card>

  <n-modal v-model:show="showModal" :mask-closable="false">
    <n-card
      style="width: 600px"
      size="huge"
      :bordered="false"
      role="dialog"
      aria-modal="true"
    >
      休息一下吧，下次再做
      <template class="f jc-fe">
        <n-space>
          <n-button secondary type="tertiary" @click="onNegativeClick"
            >下次在做</n-button
          >
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
import { useRouter } from "vue-router";
import api from "@api";
import { useMessage } from "naive-ui";

const router = useRouter();
const message = useMessage();
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
  router.back();
};
const onPositiveClick = () => {
  play_time();
  condition.value = true;
  showModal.value = false;
};

// 弹出确认dialog
const sureBegin = ref(true);
const loading = ref(false);
const abandonHandle = () => {
  router.back();
};

// 定义存储题目变量
const subject = ref([]);
const i = ref(0);
const acceptHandle = () => {
  loading.value = true;
  // 获取题目
  api.questionnaire.allSubject().then((res) => {
    subject.value = res.data;
    sureBegin.value = false;
    loading.value = false;
  });
};

// 下一题
const nextHandle = (type) => {
  // true 为交卷
  if (!type) {
    if (subject.value[i.value].res == "") {
      message.warning("请选择答案");
      return;
    }
    i.value++;
    return;
  }
  submitAnsHandle();
};
// 点数字换题
const numberHandle = (id) => {
  i.value = id - 1;
};

// 提前交卷
const submitAnsHandle = () => {
  const data = subject.value.map((it) => {
    return {
      titleId: it.id, // 题目id
      ansFromUser: it.res, // 选的答案
    };
  });
  console.log(data);
};
</script>

<style lang="scss">
.ques-content {
  width: 1000px;
  margin: 0 10px 10px 0;
}
</style>
