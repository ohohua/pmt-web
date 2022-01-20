<template>
  <div class="index">
    <lr-header />
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </div>
</template>

<script setup>
import lrHeader from "./lr-header.vue";
</script>

<style lang="scss">
.index {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgb(240, 242, 245);
}
</style>
