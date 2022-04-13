<script setup>
import { reactive } from "vue";

const emit = defineEmits(['describe'])
const form = reactive({
  symptom: null,
});
const symptomHandle = () => {
  emit('describe', form);
}
</script>

<template>
  <n-card title="描述症状" size="small" :segmented="{ content: true }" hoverable>
    <n-form label-placement="left">
      <n-form-item label="描述症状">
        <n-input
          v-model:value="form.symptom"
          type="textarea"
          placeholder="描述个人病情"
          maxlength="200" 
          show-count
        />
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="symptomHandle">提交</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>
<style lang="scss"></style>
