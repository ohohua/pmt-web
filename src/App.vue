<script setup>
import { dateZhCN, zhCN } from "naive-ui";
import lrLoadingBar from "@components/lr-loading-bar.vue";
const themeOverrides = {
  common: {
    fontWeightStrong: "600",
  },
  Input: {
    color: "rgba(183, 198, 187, .1)",
    placeholderColor: "#FEFEFE",
    colorFocus: "rgba(183, 198, 187, .3)",
  },
  Card: {
    color: "#FFFFFF40",
    actionColor: "FFFFFF40",
  },
  Popover: {
    color: "#FFFFFF40",
  },
  Dropdown: {
    color: "#FFFFFF40",
  },
  DataTable: {
    thColor: "#EFE8E800",
  },
  Modal: {
    color: "#FFFFFF40",
  },
  Layout: {
    color: "#FFFFFF00",
    siderColor: "#FCFCFC00",
    siderToggleButtonColor: "#FFFFFF91",
    siderBorderColor: "rgba(255, 255, 255, 0)"
  },
  DataTable: {
    thColor: "rgba(250, 250, 252, 10%)",
    tdColor: "#FFFFFF00",
    tdColorHover: "rgba(247, 247, 250, .1)",
    tdTextColor: "rgba(112, 114, 116, 1)"
  }
};
</script>

<template>
  <n-config-provider
    :theme-overrides="themeOverrides"
    :date-locale="dateZhCN"
    :locale="zhCN"
  >
    <n-loading-bar-provider>
      <n-message-provider>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </n-message-provider>
      <lr-loading-bar />
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style></style>
