<script setup>
import publish from "./components/publish.vue";
import articleBody from "./components/article-body.vue";
</script>

<template>
  <div class="pd10 h100p w100p publish">
    <div class="w1000 m0a h100p">
      <publish />
      <article-body />
    </div>
  </div>
</template>

<style lang="scss">
.publish {
  overflow: scroll;
}
</style>
