<template>
  <header class="lr-header f ai-c jc-sb">
    <div class="cp f ai-c">
      <div class="logo">心理医疗系统</div>
    </div>
    <div class="f jc-sb ai-c" style="width: 600px">
      <n-menu
        v-model:value="activeKey"
        mode="horizontal"
        :options="menuOptions"
      />
      <lr-header-right @changeMenu="changeMenu" />
    </div>
  </header>
</template>

<script setup>
import lrHeaderRight from "./lr-header-right.vue";
import { createMenu } from "./menu.js";
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const activeKey = ref(null);
const menuOptions = createMenu();

const changeMenu = () => {
  activeKey.value = null;
};
watchEffect(() => {
  activeKey.value = route.path.substring(7);
});
</script>

<style lang="scss">
.lr-header {
  height: 48px;
  padding: 0 40px;
  background-color: #ffffff40;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08),
    0 3px 6px 0 rgba(0, 0, 0, 0.06), 0 5px 12px 4px rgba(0, 0, 0, 0.04);

  .logo {
    height: 25px;
    width: 160px;
    font-size: large;
    font-weight: 900;
  }
}
</style>
