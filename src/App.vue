<script setup>
  import { dateZhCN, zhCN } from 'naive-ui';

  const themeOverrides = {
    common: {
      fontWeightStrong: '600',
    },

  };
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :date-locale="dateZhCN" :locale="zhCN">
    <n-loading-bar-provider>
      <n-message-provider>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style></style>
