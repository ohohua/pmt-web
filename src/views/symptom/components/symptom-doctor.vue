<script setup>
import { Sort as SortIcon } from "@vicons/fa";
import { BonfireSharp as BonfireSharpIcon } from "@vicons/ionicons5";
import { FiberNewFilled as NewIcon } from "@vicons/material";
import { Icon } from "@vicons/utils";
import symptomDoctorItem from "./symptom-doctor-item.vue";
import { ref } from 'vue';

const emit = defineEmits(['showRight']);

const SortByNumberHandle = () => {};
const SortByFireHandle = () => {};
const SortByNewestHandle = () => {};
const its = [
  {
    id: 1
  },
  {
    id: 2
  }
];
const isShrink = ref(false);
const ItemHandle = (id) => {
  isShrink.value = true;
  emit('showRight');
}
</script>

<template>
  <n-card
    title="生死肉骨"
    size="small"
    :segmented="{ content: true }"
    :class="{f: true, contentWidth: isShrink}"
  >
    <template #header-extra>
      <div class="f jc-sb" style="width: 80px">
        <n-tooltip trigger="hover">
          <template #trigger>
            <Icon class="cp" @click="SortByNumberHandle">
              <sort-icon />
            </Icon>
          </template>
          最勤优先
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <Icon class="cp" @click="SortByFireHandle">
              <bonfire-sharp-icon />
            </Icon>
          </template>
          最热优先
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <Icon class="cp" @click="SortByNewestHandle">
              <new-icon />
            </Icon>
          </template>
          最新优先
        </n-tooltip>
      </div>
    </template>
    <n-scrollbar style="max-height: calc(100vh - 210px);">
      <n-space >
        <symptom-doctor-item v-for="it in its" key="it.id" @click="ItemHandle(it.id)"/>
      </n-space>
    </n-scrollbar>
  </n-card>
</template>

<style lang="scss">
  .contentWidth {
    width: 450px;
  }
</style>
