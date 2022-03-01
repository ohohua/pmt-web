<template>
  <div class="lr-login bg-pan-left f jc-se ai-c">
    <div style="width: 600px; ">
      <n-carousel autoplay>
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
        />
        <img
          class="carousel-img"
          src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg"
        />
      </n-carousel>
    </div>
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
  .carousel-img {
    width: 100%;
    height: 360px;
    object-fit: cover;
  }
}
</style>
