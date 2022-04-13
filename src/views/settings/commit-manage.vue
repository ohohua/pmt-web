<template>
  <div class="user-manage f fd-col h100p">
    <n-card class="f1 mb24">
      <n-space>
        <n-input v-model:value="inputValue" placeholder="用户名" />
        <n-button type="info" @click="loadUser">搜索</n-button>
        <n-button type="primary" @click="openModal('add')">新增</n-button>
        <n-button
          type="warning"
          @click="delUser"
          :disabled="checkedRowKeys.length === 0"
          >删除</n-button
        >
      </n-space>
      <n-data-table
        :columns="columns"
        :data="list"
        :bordered="true"
        :loading="loading"
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
          <n-form-item label="用户名" path="username">
            <n-input
              v-model:value="modal.data.username"
              placeholder="请输入用户名"
              :disabled="modal.title === '修改'"
            />
          </n-form-item>
          <n-form-item label="昵称" path="nickname">
            <n-input
              v-model:value="modal.data.nickname"
              placeholder="请输入昵称"
            />
          </n-form-item>
          <n-form-item
            label="密码"
            path="password"
            v-if="modal.title === '新增'"
          >
            <n-input
              v-model:value="modal.data.password"
              placeholder="请输入密码"
            />
          </n-form-item>
          <n-form-item label="头像" path="avatar" v-if="modal.title === '修改'">
            <n-avatar round :src="modal.data.avatar" />
          </n-form-item>
          <n-form-item label="权限" path="role">
            <n-select v-model:value="modal.data.role" :options="options" />
          </n-form-item>
          <!-- <n-form-item label="点赞量" path="praiseQuantity">
            <n-input-number
              v-model:value="modal.data.praiseQuantity"
              placeholder="请输入点赞量"
            />
          </n-form-item> -->
          <!-- <n-form-item label="回答数" path="answerNumber">
            <n-input-number
              v-model:value="modal.data.answerNumber"
              placeholder="请输入回答数"
            />
          </n-form-item> -->
          <n-form-item label="新人" path="isNew">
            <n-radio-group v-model:value="modal.data.isNew" name="isNew">
              <n-space>
                <n-radio :value="0"> 新人 </n-radio>
                <n-radio :value="1"> 老人 </n-radio>
              </n-space>
            </n-radio-group>
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
import { userColumns } from "./components/columns.js";
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
const columns = userColumns(openModal);
const inputValue = ref(null);
const loading = ref(false);
const list = ref([]);
const checkedRowKeys = ref([]);
const formRef = ref(null);
const options = [
  {
    label: "管理员",
    value: "root",
  },
  {
    label: "医生",
    value: "doctor",
  },
  {
    label: "患者",
    value: "patient",
  },
];
const createData = () => {
  return {
    username: null,
    nickname: null,
    password: null,
    avatar: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
    role: "patient",
    praiseQuantity: 0,
    answerNumber: 0,
    isNew: 0,
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

// 获取用户数据
const loadUser = () => {
  loading.value = true;
  api.front.loadAllUser({ username: inputValue.value }).then((res) => {
    list.value = res.data &&  res.data.map((_, index) => ({ ..._, key: index + 1 }));
    loading.value = false;
  });
};

// 删除特定用户
const delUser = () => {
  const data = [];
  for (let checked of checkedRowKeys.value) {
    data.push(list.value[checked - 1]);
  }
  api.front.delUser(data).then((res) => {
    if (res && res.code === 0) {
      message.success(res.data);
      loadUser();
    }
  });
};

// 新增用户信息
const addUser = () => {
  const data = { ...modal.data };
  api.front.addUser(data).then((res) => {
    if (res && res.code === 0 && res.data === undefined) {
      message.success("新增成功！");
      loadUser();
    } else {
      message.error(res.data);
    }
  });
};
// 更改用户信息
const updateUser = () => {
  const data = { ...modal.data };
  console.log(data);
  api.front.updateUser(data).then((res) => {
    if (res && res.code === 0 && res.data !== "没有该账户！") {
      message.success(res.data);
      loadUser();
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
    updateUser();
  }
  modal.showModal = false;
};
const cancel = () => {
  modal.data = createData();
  modal.showModal = false;
};
loadUser();
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
