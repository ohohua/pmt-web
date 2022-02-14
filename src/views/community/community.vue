<script setup>
import publish from "./components/publish.vue";
import articleBody from "./components/article-body.vue";
import { ref } from "vue";

const articleRef = ref(null);
const publishHandle = () => {
  articleRef.value.loadComment();
};
</script>

<template>
  <div class="pd10 h100p w100p publish">
    <div class="w1000 m0a h0 f fd-col">
      <publish @publish-handle="publishHandle" />
      <article-body ref="articleRef" />
    </div>
  </div>
</template>

<style lang="scss">
.publish {
  overflow: scroll;
}
</style>
