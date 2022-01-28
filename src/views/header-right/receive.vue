<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import api from "@api";
const route = useRoute();
const patientMessage = ref(null);
const loadByName = () => {
  api.header
    .loadByName({ username: route.params.username })
    .then((res) => {
      patientMessage.value = res.data[0];
    })
    .catch((e) => console.log(e));
};
loadByName();
console.log(route.params.username);
</script>

<template>
  <div class="pd10 h100p w100p" >
    <n-card class="h100p w100p ">
      
    </n-card>
  </div>
</template>

<style lang="scss"></style>
