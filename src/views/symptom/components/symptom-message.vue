<template>
  <n-card
    title="姓甚名谁"
    size="small"
    hoverable
    :segmented="{ content: true }"
    :class="{ isShrink: shrink }"
  >
    <n-form
      :label-width="80"
      :model="form"
      :rules="messageRule"
      label-placement="left"
      ref="formRef"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="8" label="姓名" path="name">
          <n-input
            v-model:value="form.name"
            :maxlength="10"
            placeholder="输入姓名"
            clearable
          />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="电话号码"  path="phone">
          <n-input
            placeholder="电话号码"
            v-model:value="form.phone"
            :maxlength="11"
            clearable
          />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="血型" path="bloodType">
          <n-select
            v-model:value="form.bloodType"
            :options="bloodOptions"
            clearable
          />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="出生日期" path="age">
          <n-date-picker
            v-model:value="form.age"
            type="date"
            clearable
          />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="性别" path="sex">
          <n-radio-group v-model:value="form.sex" name="radiogroup">
            <n-radio key="1" value="1">男 </n-radio>
            <n-radio key="2" value="2">女 </n-radio>
          </n-radio-group>
        </n-form-item-gi>

        <n-form-item-gi :span="8">
          <n-button type="primary" @click="nextHandle">下一步</n-button>
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-card>
</template>
<script setup>
import { ref, reactive } from "vue";
import { messageRule, bloodOptions } from "@consts/index.js";
const emit = defineEmits(["messageForm"]);
const formRef = ref(null);
const form = reactive({
  name: null,
  age: null,
  phone: null,
  sex: null,
  bloodType: null,
});
const disablePreviousDate = (ts) => {
  return ts > Date.now();
};

const shrink = ref(false);
const nextHandle = () => {
  formRef.value.validate((errors) => {
    if (!errors) {
      shrink.value = true;
      emit("messageForm", form);
    } else {
      console.log(errors);
    }
  });
};
</script>

<style lang="scss">
.isShrink {
  height: 200px;
}
</style>
