<script setup>
import { pinia } from "@store/index.js";
import { createNewsCols } from "./cols.js";
import api from "@api";
import { ref } from "vue";

const emit = defineEmits(["todoList"]);
const store = pinia.useUserStore();
const data = ref([]);
const cols = createNewsCols();
const loadNews = () => {
  api.header
    .underRes()
    .then((res) => {
      data.value = res.data;
      emit("newsList", data.value.length);
    })
    .catch((e) => console.log(e));
};

// 只有在用户不是是医生才回去获取所属病人列表
if (store.role !== "doctor") {
  loadNews();
}
</script>

<template>
  <n-data-table
    :columns="cols"
    :data="data"
    :max-height="200"
    style="width: 190px"
    virtual-scroll
  />
</template>

<style lang="scss"></style>
