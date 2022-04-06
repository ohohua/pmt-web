<template>
  <div class="user-manage f fd-col h100p">
    <n-card class="f1 mb24">
      <n-space>
        <n-input v-model:value="inputValue" placeholder="用户名" />
        <n-button type="info" @click="loadUser">搜索</n-button>
        <n-button type="primary">新增</n-button>
        <n-button type="warning">删除</n-button>
      </n-space>
      <n-data-table
        :columns="columns"
        :data="list"
        :bordered="true"
        :loading="loading"
        class="h0 f1 mt10"
        flex-height
        :pagination="pagination"
      >
        <template #empty>
          <empty class="h100p" />
        </template>
      </n-data-table>
    </n-card>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import empty from "@components/empty.vue";
import { userColumns } from "./components/columns.js";
import api from "@api";

const columns = userColumns();
const inputValue = ref(null);
const loading = ref(false);
const list = ref([]);
const pagination = reactive({
  pageSize: 10,
});

// 获取用户数据
const loadUser = () => {
  loading.value = true;
  api.front.loadAllUser({ username: inputValue.value }).then((res) => {
    list.value = res.data.map((_, index) => ({ ..._, key: index + 1 }));
    loading.value = false;
  });
};


loadUser();
// watchEffect(loadUser);
</script>

<style lang="scss">
.user-manage {
  .n-card__content {
    display: flex;
    flex-direction: column;
    height: 100%;

    .n-checkbox-box {
      background-color: transparent;
    }

    .n-pagination-item {
      background-color: transparent;
    }
  }
  .n-pagination
    .n-pagination-item.n-pagination-item--disabled.n-pagination-item--button {
    background-color: transparent;
    // color: #1ea15c;
    // border-color: #1ea15c;
  }
}
</style>
