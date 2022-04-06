<template>
  <div class="empty f fd-col jc-c ai-c">
    <i></i>
    <span v-if="props.msg">{{ props.msg }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: String,
    default: "暂无数据",
  },
});
</script>

<style lang="scss">
.empty {
  i {
    width: 50px;
    height: 39px;
    background-position: center;
    background-size: 100% 100%;
    background-image: url("@assets/empty.svg");
  }

  span {
    margin-top: 12px;
    padding-bottom: 16px;
    font-size: 12px;
    color: #caced5;
  }
}
</style>
