<template>
  <div class="lr-login bg-pan-left f jc-c ai-c">
    <lr-login-form />
  </div>
</template>

<script setup>
import lrLoginForm from "./lr-login-form.vue";

</script>

<style scoped lang="scss">
.lr-login {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
