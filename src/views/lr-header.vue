<template>
  <header class="lr-header f ai-c">
    <div>logo</div>
    <n-menu
      v-model:value="activeKey"
      mode="horizontal"
      :options="menuOptions"
    ></n-menu>
  </header>
</template>

<script setup>
import { createMenu } from "./menu.js";
import { ref } from 'vue'

const activeKey = ref('symptom')
const menuOptions = createMenu();
</script>

<style lang="scss">
.lr-header {
  height: 48px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08), 0 3px 6px 0 rgba(0, 0, 0, 0.06), 0 5px 12px 4px rgba(0, 0, 0, 0.04);
}
</style>
