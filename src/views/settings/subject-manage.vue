<template>
  <div class="user-manage f fd-col h100p">
    <n-card class="f1 mb24">
      <n-space>
        <n-input v-model:value="inputValue" placeholder="题目名" />
        <n-button type="info" @click="loadSubject">搜索</n-button>
        <n-button type="primary" @click="openModal('add')">新增</n-button>
        <n-button
          type="warning"
          @click="delSubject"
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
          <n-form-item label="题目" path="title">
            <n-input v-model:value="modal.data.title" placeholder="题目" />
          </n-form-item>
          <n-form-item label="选项A" path="A">
            <n-input v-model:value="modal.data.A" placeholder="请输入A选项" />
          </n-form-item>
          <n-form-item label="选项B" path="B">
            <n-input v-model:value="modal.data.B" placeholder="请输入B选项" />
          </n-form-item>

          <n-form-item label="选项C" path="C">
            <n-input v-model:value="modal.data.C" placeholder="请输入C选项" />
          </n-form-item>
          <n-form-item label="选项D" path="D">
            <n-input v-model:value="modal.data.D" placeholder="请输入D选项" />
          </n-form-item>
          <n-form-item label="答案" path="ans">
            <n-select v-model:value="modal.data.ans" :options="options" />
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
import { subjectColumns } from "./components/columns.js";
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
const columns = subjectColumns(openModal);
const inputValue = ref(null);
const loading = ref(false);
const list = ref([]);
const checkedRowKeys = ref([]);
const formRef = ref(null);
const options = [
  {
    label: "A",
    value: "A",
  },
  {
    label: "B",
    value: "B",
  },
  {
    label: "C",
    value: "C",
  },
    {
    label: "D",
    value: "D",
  },
];
const createData = () => {
  return {
    title: null,
    A: null,
    B: null,
    C: null,
    D: null,
    res: '',
    ans: null
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

// 获取题目数据
const loadSubject = () => {
  loading.value = true;
  api.front.loadAllSubject({title: inputValue.value}).then((res) => {
    list.value =
      res.data && res.data.map((_, index) => ({ ..._, key: index + 1 }));
    loading.value = false;
  });
};

// 删除题目
const delSubject = () => {
  const data = [];
  for (let checked of checkedRowKeys.value) {
    data.push(list.value[checked - 1]);
  }
  api.front.delSubject(data).then((res) => {
    if (res && res.code === 0) {
      message.success(res.data);
      loadSubject();
    }
  });
};

// 新增题目信息
const addSubject = () => {
  const data = { ...modal.data };
  api.front.addSubject(data).then((res) => {
    if (res && res.code === 0 && res.data === undefined) {
      message.success("新增成功！");
      loadSubject();
    } else {
      message.error(res.data);
    }
  });
};
// 更改题目信息
const updateSubject = () => {
  const data = { ...modal.data };
  api.front.updateSubject(data).then((res) => {
    if (res && res.code === 0 && res.data !== "没有该题目！") {
      message.success(res.data);
      loadSubject();
    } else {
      message.error(res.data);
    }
  });
};

// 模态框确定
const submit = () => {
  if (modal.title === "新增") {
    addSubject();
  } else if (modal.title === "修改") {
    updateSubject();
  }
  modal.showModal = false;
};
const cancel = () => {
  modal.data = createData();
  modal.showModal = false;
};
loadSubject();
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
  }
}
</style>
