<!-- 有成绩显示成绩， 没成绩显示是否开始测试 -->
<template>
  <div class="ques-type__container f fd-col">
    <n-card class="f ai-c f1">
      <n-result :title="grade"  size="huge">
        <template #icon>
            <Telescope style="color: #ffffff;"/>
        </template>
        <template #footer>
          <n-button type="primary" @click="testHandle">{{flag ? '开始测试' : '重新测试'}}</n-button>
        </template>
      </n-result>
    </n-card>
  </div>
</template>

<script setup>
import { Telescope } from "@vicons/ionicons5";
import { ref } from 'vue';
import api from "@api";
import { pinia } from '@store/index.js';

const store = pinia.useUserStore();
const grade = ref(`${store.nickname}：`);
const flag = ref(true);
const emit = defineEmits(["action"]);
const testHandle = () => {
  emit("action");
};

api.questionnaire.loadGrade().then((res) => {
  if(res &&  res.code === 0 && res.data[0]) {
    flag.value = false;
    grade.value += res.data[0].grade + ' 分';
  } else {
    grade.value = '来吧！测试测试？'
    flag.value = true;
  }
}).catch(err => {
  console.log(err);
})
</script>

<style lang="scss">
.ques-type__container {
  flex: 1;
  width: 0;
  .n-card__content {
    display: flex;
    align-items: center;
  }
}
</style>
