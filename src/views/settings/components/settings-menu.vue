<template>
  <div class="setting-menu">
    <n-layout has-sider>
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="180"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          v-model:value="handleUpdateValue"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menu"
        />
      </n-layout-sider>
      <div style="margin-right: 30px;"></div>
    </n-layout>
  </div>
</template>

<script setup>
import { createMenu } from "./menu";
import { ref } from "vue";

const menu = createMenu();
const handleUpdateValue = ref(null);
const collapsed = ref(true);
</script>

<style lang="scss">

</style>
