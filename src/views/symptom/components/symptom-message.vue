<template>
  <n-card title="姓谁名谁" size="small" :segmented="{ content: true }">
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
        <n-form-item-gi :span="8" label="出生日期" path="age">
          <n-date-picker
            v-model:value="form.age"
            type="date"
            clearable
            :is-date-disabled="disablePreviousDate"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="电话号码" :maxlength="11" path="phone">
          <n-input
            placeholder="电话号码"
            v-model:value="form.phone"
            clearable
          />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="性别">
          <n-radio-group v-model:value="form.sex" name="radiogroup">
            <n-radio key="1" value="1">男 </n-radio>
            <n-radio key="2" value="2">女 </n-radio>
          </n-radio-group>
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="血型">
          <n-select
            v-model:value="form.bloodType"
            :options="bloodOptions"
            clearable
          />
        </n-form-item-gi>
        <n-form-item-gi :span="8" label="备注">
          <n-input
            v-model:value="form.remarks"
            placeholder="输入备注"
            :maxlength="50"
            clearable
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </n-card>
</template>
<script setup>
import { ref } from "vue";
import { messageRule, bloodOptions } from "@consts/index.js";
const formRef = ref(null);
const form = ref({
  name: null,
  age: null,
  phone: null,
  sex: null,
  bloodType: null,
  remarks: null,
});
const disablePreviousDate = (ts) => {
  return ts > Date.now();
};
</script>

<style lang="scss"></style>
