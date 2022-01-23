<script setup>
import { reactive } from "vue";
import { useMessage } from 'naive-ui';
const message = useMessage();
const emit = defineEmits(['describe'])
const form = reactive({
  symptom: null,
});
const symptomHandle = () => {
  message.success('提交成功')
  emit('describe', form);
}
</script>

<template>
  <n-card title="有何贵干" size="small" :segmented="{ content: true }" hoverable>
    <n-form label-placement="left">
      <n-form-item label="描述症状">
        <n-input
          v-model:value="form.symptom"
          type="textarea"
          placeholder="描述个人病情"
          :maxlength="11"
        />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="symptomHandle">提交</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>
<style lang="scss"></style>
