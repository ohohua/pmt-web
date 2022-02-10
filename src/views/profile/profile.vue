<script setup>
import { ThumbsUpRegular as ThumbIcon } from "@vicons/fa";
import { NumberSymbol16Filled as NumberIcon } from "@vicons/fluent";
import { FiberNewFilled as NewIcon } from "@vicons/material";
import { computed } from "vue";
import { pinia } from "@store/index";
import { Icon } from "@vicons/utils";

const store = pinia.useUserStore();
const role = computed(() => store.role);
const avatar = computed(() => store.avatar);
const nickname = computed(() => store.nickname);
const doctor = computed(() => store.doctor);
</script>

<template>
  <div class="profile f fd-col h100p">
    <div class="f h0 f1">
      <n-card class="f1">
        <div style="text-align: center">
          <n-avatar round :size="150" :src="avatar" />
          <h2 class="mt20">
            {{ nickname }}
            <Icon v-if="doctor._isNew">
              <new-icon />
            </Icon>
          </h2>
        </div>
        <div class="" v-if="role === 'doctor'">
          <div>
            <Icon>
              <NumberIcon />
            </Icon>
            <span>解答： {{ doctor._answerNumber }}</span>
          </div>
          <div class="mt20">
            <Icon>
              <ThumbIcon />
            </Icon>
            <span>获赞：{{ doctor._praiseQuantity }}</span>
          </div>
        </div>
      </n-card>
      <n-card class="f2 ml10">
        <n-alert :show-icon="false" closable>
          <span v-if="role === 'patient'">{{`你好，${nickname}，欢迎你使用医疗管理系统！`}}</span>
          <span v-if="role === 'root'">{{`你好，超级管理员${nickname}`}}</span>
          <span v-if="role === 'doctor'">{{`你好，${nickname}医生，欢迎你使用医疗管理系统！`}}</span>
        </n-alert>
      </n-card>
    </div>
  </div>
</template>
<style lang="scss">
.profile {
  padding: 10px;
}
</style>
