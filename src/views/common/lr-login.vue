<template>
  <div class="lr-login">
    <lr-login-form
      :is-active="isActive"
      @yingyangActive="yingyangActive = false"
    />
    <div class="yinyang" @click="handleYY" v-if="yingyangActive" />
  </div>
</template>

<script setup>
import lrLoginForm from "./lr-login-form.vue";
import { ref } from "vue";
const isActive = ref(false);
const yingyangActive = ref(true);
const handleYY = () => {
  isActive.value = true;
};
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
  // background: url("@/assets/login-bg.png") no-repeat center center fixed;
  // -webkit-background-size: cover;
  // -moz-background-size: cover;
  // -o-background-size: cover;
  // background-size: cover;

  .yinyang {
    position: absolute;
    width: 200px;
    height: 200px;
    // margin: 250px auto;
    left: 43%;
    top: 41%;
    border-radius: 50%;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.08),
      0 3px 6px 0 rgba(0, 0, 0, 0.06), 0 5px 12px 4px rgba(0, 0, 0, 0.04);
    background: linear-gradient(
      to bottom,
      #fff 0%,
      #fff 50%,
      #000 50%,
      #000 100%
    );
    animation: spin 5s linear infinite;
  }

  .yinyang::before,
  .yinyang::after {
    box-sizing: border-box;
    position: absolute;
    top: 50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    content: "";
  }

  .yinyang::before {
    left: 0;
    border: 40px solid #000;
    background: #fff;
  }

  .yinyang::after {
    right: 0;
    border: 40px solid #fff;
    background: #000;
  }
  /* css3 动画 */
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
