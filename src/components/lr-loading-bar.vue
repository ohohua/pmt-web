<script setup>
import { computed, watch } from 'vue';
import { pinia } from '@store/index.js'
import { useLoadingBar } from 'naive-ui';
const store = pinia.useCommonStore();
const loadingBar = useLoadingBar();
const loading = computed(() => store.loading)
watch(loading, (val) => {val ? loadingBar.start() : loadingBar.finish()});
</script>

<template></template>
<style lang='scss'></style>