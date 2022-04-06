<template>
  <div class="settings__wrap f ai-c h100p">
    <settingsMenu />
    <router-view v-slot="{ Component }" class="f1 as-fs">
      <component :is="Component"></component>
    </router-view>
  </div>
</template>

<script setup>
import settingsMenu from "./components/settings-menu.vue";


</script>

<style lang="scss">
.settings__wrap {
  padding: 10px 10px 10px 0;
  .n-menu {
    border: solid 1px #efeff5;
    border-radius: 0 30px 30px 0;
  }
}
</style>
