<template>
  <div class="user-manage f fd-col h100p">
    <n-card class="f1 mb24">
      <n-space>
        <n-input v-model:value="inputValue" placeholder="姓名" />
        <n-button type="info" @click="loadDisease">搜索</n-button>
        <!-- <n-button type="primary" @click="openModal('add')">新增</n-button> -->
        <n-button
          type="warning"
          @click="delDisease"
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
          <n-form-item label="姓名" path="name">
            <n-input v-model:value="modal.data.name" placeholder="请输入姓名" />
          </n-form-item>
          <n-form-item label="账号" path="username">
            <n-input
              v-model:value="modal.data.username"
              placeholder="请输入账号"
              :disabled="true"
            />
          </n-form-item>
          <n-form-item label="年龄">
            <n-input v-model:value="modal.data.age" placeholder="请输入年龄" />
          </n-form-item>
          <n-form-item label="性别" path="sex">
            <n-select v-model:value="modal.data.sex" :options="optionsSex" />
          </n-form-item>
          <n-form-item label="血型" path="bloodType">
            <n-select v-model:value="modal.data.bloodType" :options="options" />
          </n-form-item>
          <n-form-item label="电话" path="phone">
            <n-input
              v-model:value="modal.data.phone"
              placeholder="请输入电话"
            />
          </n-form-item>
          <n-form-item label="症状" path="symptom">
            <n-input
              v-model:value="modal.data.symptom"
              placeholder="请输入症状"
            />
          </n-form-item>
          <n-form-item label="医生建议" path="response">
            <n-input
              v-model:value="modal.data.response"
              placeholder="请输入建议"
            />
          </n-form-item>
          <n-form-item label="诊断医生" path="doctorUsername">
            <n-input
              v-model:value="modal.data.doctorUsername"
              placeholder="请输入诊断医生"
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
import { diseaseColumns } from "./components/columns.js";
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
const columns = diseaseColumns(openModal);
const inputValue = ref(null);
const loading = ref(false);
const list = ref([]);
const checkedRowKeys = ref([]);
const formRef = ref(null);
const options = [
  {
    label: "A型",
    value: "A",
  },
  {
    label: "B型",
    value: "B",
  },
  {
    label: "AB型",
    value: "C",
  },
  {
    label: "O型",
    value: "O",
  },
];
const optionsSex = [
  {
    label: "男",
    value: "男",
  },
  {
    label: "女",
    value: "女",
  },
  {
    label: "未知",
    value: "未知",
  },
];
const createData = () => {
  return {
    username: null,
    name: null,
    age: null,
    sex: null,
    bloodType: null,
    doctorUsername: null,
    phone: null,
    symptom: null,
    response: null,
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
const loadDisease = () => {
  loading.value = true;
  api.front.loadAllDisease({ name: inputValue.value }).then((res) => {
    list.value =
      res.data && res.data.map((_, index) => ({ ..._, key: index + 1 }));
    loading.value = false;
  });
};

// 删除病例
const delDisease = () => {
  const data = [];
  for (let checked of checkedRowKeys.value) {
    data.push(list.value[checked - 1]);
  }
  api.front.delDisease(data).then((res) => {
    if (res && res.code === 0) {
      message.success(res.data);
      loadDisease();
    }
  });
};

// 更改用户信息
const updateDisease = () => {
  const data = { ...modal.data };
  console.log(data);
  api.front.updateDisease(data).then((res) => {
    if (res && res.code === 0 && res.data !== "没有该账户！") {
      message.success(res.data);
      loadDisease();
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
    updateDisease();
  }
  modal.showModal = false;
};
const cancel = () => {
  modal.data = createData();
  modal.showModal = false;
};
loadDisease();
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
