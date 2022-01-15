<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="/^home-/">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<script setup>

</script>

<style lang='scss'></style>
