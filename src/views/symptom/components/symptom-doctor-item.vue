<script setup>
import { ThumbsUpRegular as ThumbIcon } from "@vicons/fa";
import { NumberSymbol16Filled as NumberIcon } from "@vicons/fluent";
import { FiberNewFilled as NewIcon } from "@vicons/material";
import { Icon } from "@vicons/utils";
import api from "@api";
import { ref } from 'vue';

const props = defineProps({
  doctor: {
    type: Object,
    default: () => ({}),
  },
});
const src = "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg";
const flag = ref(false); // 只能点赞一次的标志位
const HandleSortByFire = (e) => {
  e.stopPropagation(); // 阻止冒泡
  if (flag.value) {
    return;
  }
  props.doctor.praiseQuantity += 1;
  flag.value = true;
  updateMessage();
};
const updateMessage = () => {
  const data = {
    username: props.doctor.username,
    praiseQuantity: props.doctor.praiseQuantity,
  };
  api.symptom.updatePraise(data).catch(e => console.log(e));
};
</script>

<template>
  <n-card
    size="small"
    hoverable
    :segmented="{ footer: true }"
    class="doctor-item cp"
  >
    <div class="f ai-c">
      <n-avatar size="small" round :src="src" />
      <span class="ml12">{{ props.doctor.nickname }}</span>
    </div>
    <template #footer>
      <div class="f jc-sb">
        <n-tooltip trigger="hover" placement="bottom">
          <template #trigger>
            <div>
              <Icon>
                <NumberIcon />
              </Icon>
              <span>{{ props.doctor.answerNumber }}</span>
            </div>
          </template>
          救死扶伤的人数
        </n-tooltip>
        <n-tooltip trigger="hover" placement="bottom">
          <template #trigger>
            <div>
              <Icon @click="HandleSortByFire" :class="{ isActive: flag}">
                <ThumbIcon />
              </Icon>
              <span style="margin-left: 3px" :class="{ isActive: flag}">{{
                props.doctor.praiseQuantity
              }}</span>
            </div>
          </template>
          人民群众的爱戴
        </n-tooltip>
        <n-tooltip
          trigger="hover"
          placement="bottom"
          v-if="!!props.doctor.isNew"
        >
          <template #trigger>
            <Icon>
              <new-icon />
            </Icon>
          </template>
          新进医生
        </n-tooltip>
      </div>
    </template>
  </n-card>
</template>

<style lang="scss">
.doctor-item {
  width: 195px;
  .n-card__content {
    display: flex;
    justify-content: center;
  }

  .isActive {
    color: rgb(24, 160, 88);
  }
}
</style>
