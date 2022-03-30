<script setup>
import { Sort as SortIcon } from "@vicons/fa";
import { BonfireSharp as BonfireSharpIcon } from "@vicons/ionicons5";
import { FiberNewFilled as NewIcon } from "@vicons/material";
import { Icon } from "@vicons/utils";
import symptomDoctorItem from "./symptom-doctor-item.vue";
import { ref, reactive } from "vue";
import { IosAirplane } from "@vicons/ionicons4";
import api from "@api";

const emit = defineEmits(["showRight"]);

const loading = ref(false);

const params = reactive({
  role: "doctor",
  sort: null,
  isNew: false,
});
const SortByNumberHandle = () => {
  params.isNew = false;
  params.sort = "answerNumber";
  loadDoctorInfo();
};
const SortByFireHandle = () => {
  params.isNew = false;
  params.sort = "praiseQuantity";
  loadDoctorInfo();
};
const SortByNewestHandle = () => {
  params.isNew = true;
  loadDoctorInfo();
};
const its = ref(null);
const isShrink = ref(false);
const ItemHandle = (id) => {
  isShrink.value = true;
  emit("showRight", id);
};
const loadDoctorInfo = () => {
  loading.value = true;
  api.symptom
    .doctorInfo(params)
    .then((res) => {
      its.value = res.data;
      loading.value = false;
    })
    .catch((e) => {
      console.error(e);
    });
};
loadDoctorInfo();
</script>

<template>
  <n-card
    title="生死肉骨"
    size="small"
    hoverable
    :segmented="{ content: true }"
    :class="{ f: true, contentWidth: isShrink }"
  >
    <template #header-extra>
      <div class="f jc-sb" style="width: 80px">
        <n-tooltip trigger="hover">
          <template #trigger>
            <Icon class="cp" @click="SortByNumberHandle">
              <sort-icon />
            </Icon>
          </template>
          最勤优先
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <Icon class="cp" @click="SortByFireHandle">
              <bonfire-sharp-icon />
            </Icon>
          </template>
          最热优先
        </n-tooltip>
        <n-tooltip trigger="hover">
          <template #trigger>
            <Icon class="cp" @click="SortByNewestHandle">
              <new-icon />
            </Icon>
          </template>
          最新优先
        </n-tooltip>
      </div>
    </template>
    <n-scrollbar style="max-height: calc(100vh - 210px)">
      <!-- <n-spin size="large" /> -->
      <n-skeleton text v-if="loading" size="large" round :repeat="19" />
      <n-space v-else>
        <symptom-doctor-item
          v-for="it in its"
          key="it.id"
          @click="ItemHandle(it.username)"
          :doctor="it"
        />
      </n-space>
      <!-- <n-empty description="-" v-if="its?.length === 0" style="color: green;">
        <template #icon>
          <n-icon color="green" size="300">
            <ios-airplane />
          </n-icon>
          <n-icon color="green" size="20">
            医生还没有入驻~
          </n-icon>
        </template>
      </n-empty> -->
    </n-scrollbar>
  </n-card>
</template>

<style lang="scss">
.contentWidth {
  width: 450px;
}
</style>
