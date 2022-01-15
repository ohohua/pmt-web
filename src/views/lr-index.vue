<template>
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template>

<script setup></script>

<style lang="scss"></style>
