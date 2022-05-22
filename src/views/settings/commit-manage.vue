<template>
  <div class="user-manage f fd-col h100p">
    <n-card class="f1 mb24">
      <n-space>
        <n-input v-model:value="inputValue" placeholder="用户名" />
        <n-button type="info" @click="searchComment">搜索</n-button>
        <!-- <n-button type="primary" @click="openModal('add')">新增</n-button> -->
        <n-button
          type="warning"
          @click="delComment"
          :disabled="checkedRowKeys.length === 0"
          >删除</n-button
        >
      </n-space>
      <n-data-table
        :columns="columns"
        :data="list"
        :bordered="true"
        :loading="loading"
        children-key="subComments"
        class="h0 f1 mt10"
        flex-height
        :pagination="pagination"
        v-model:checked-row-keys="checkedRowKeys"
      >
        <template #empty>
          <empty class="h100p" />
        </template>
      </n-data-table>
    </n-card>
    <n-modal v-model:show="modal.showModal" :mask-closable="false">
      <n-card
        style="width: 600px"
        :title="modal.title"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <n-form
          ref="formRef"
          :model="modal"
          label-placement="left"
          label-width="auto"
          require-mark-placement="right-hanging"
          :style="{
            maxWidth: '640px',
          }"
        >
          <n-form-item label="昵称" path="nickname">
            <n-input
              v-model:value="modal.data.nickname"
              placeholder="请输入昵称"
              disabled="true"
            />
          </n-form-item>
          <n-form-item label="头像" path="avatar" v-if="modal.title === '修改'">
            <n-avatar round :src="modal.data.avatar" />
          </n-form-item>
          <n-form-item label="内容" path="content">
            <n-input
              v-model:value="modal.data.content"
              placeholder="请输入内容"
            />
          </n-form-item>
          <n-form-item label="点赞量" path="praiseQuantity">
            <n-input
              v-model:value="modal.data.praiseQuantity"
              placeholder="请输入点赞量"
              disabled="true"
            />
          </n-form-item>
        </n-form>
        <template #footer>
          <div class="f jc-fe">
            <n-space>
              <n-button type="warning" secondary @click="cancel">取消</n-button>
              <n-button type="primary" secondary @click="submit">确认</n-button>
            </n-space>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import empty from "@components/empty.vue";
import { commitColumns } from "./components/columns.js";
import api from "@api";
import { useMessage } from "naive-ui";

// 打开模态框
const openModal = (val) => {
  if (val === "add") {
    modal.title = "新增";
  } else {
    modal.title = "修改";
    val.isNew = val.isNew ? 1 : 0;
    Object.assign(modal.data, val);
  }
  modal.showModal = true;
};
const message = useMessage();
const columns = commitColumns(openModal);
const inputValue = ref(null);
const loading = ref(false);
const list = ref([]);
const checkedRowKeys = ref([]);
const formRef = ref(null);
const createData = () => {
  return {
    nickname: null,
    content: null,
    avatar: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    praiseQuantity: 0,
  };
};
const modal = reactive({
  showModal: false, // 是否打开
  title: null,

  data: createData(),
});
const pagination = reactive({
  pageSize: 10,
});

// 获取评论数据
const loadComment = () => {
  loading.value = true;
  api.front.loadAllComment().then((res) => {
    list.value =
      res.data && res.data.map((_, index) => ({ ..._, key: index + 1 }));
    loading.value = false;
  });
};

const searchComment = () => {
  loading.value = true;
  api.front.searchComment({ nickname: inputValue.value }).then((res) => {
    if (res && res.code === 0) {
      list.value =
        res.data && res.data.map((_, index) => ({ ..._, key: index + 1 }));
    }
    loading.value = false;
  });
};
// 删除特定用户
const delComment = () => {
  const data = [];
  for (let checked of checkedRowKeys.value) {
    if (checked) {
      data.push(list.value[checked - 1]);
    }
  }
  api.front.delComment(data).then((res) => {
    if (res && res.code === 0) {
      message.success(res.data);
      loadComment();
      checkedRowKeys.value = [];
    }
  });
};

// 新增用户信息
const addUser = () => {
  const data = { ...modal.data };
  api.front.addUser(data).then((res) => {
    if (res && res.code === 0 && res.data === undefined) {
      message.success("新增成功！");
      loadComment();
    } else {
      message.error(res.data);
    }
  });
};
// 更改用户信息
const updateComment = () => {
  const data = { ...modal.data };
  console.log(data);
  api.front.updateComment(data).then((res) => {
    if (res && res.code === 0 && res.data !== "没有该账户！") {
      message.success(res.data);
      loadComment();
    } else {
      message.error(res.data);
    }
  });
};

// 模态框确定
const submit = () => {
  if (modal.title === "新增") {
    addUser();
  } else if (modal.title === "修改") {
    updateComment();
  }
  modal.showModal = false;
};
const cancel = () => {
  modal.data = createData();
  modal.showModal = false;
};
loadComment();
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
