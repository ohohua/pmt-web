import { h, ref } from 'vue';
import { NAvatar, NTag } from "naive-ui";


export const userColumns = (fn) => {
  // const itemHandle = (row) => {
  //   console.log(row);
  //   modal.showModal = true;
  // };
  return ref([
    {
      type: "selection",
    },
    {
      title: "用户名",
      align: "center",
      key: "username",
    },
    {
      title: "昵称",
      align: "center",
      key: "nickname",
    },
    {
      title: "头像",
      align: "center",
      key: "avatar",
      render(row) {
        return h(
          NAvatar,
          {
            size: "small",
            src: `${row.avatar}`
          },
        );
      }
    },
    {
      title: "权限",
      align: "center",
      key: "role",
      render(row) {
        return h(
          NTag,
          {
            type: `${row.role === "root"
              ? "success"
              : row.role === "patient"
                ? "warning"
                : "error"
              }`,
          },
          {
            default: () =>
              `${row.role === "root"
                ? "管理员"
                : row.role === "patient"
                  ? "患者"
                  : "医生"
              }`,
          }
        );
      },
    },
    {
      title: "点赞量",
      align: "center",
      key: "praiseQuantity",
    },
    {
      title: "回答数",
      align: "center",
      key: "answerNumber",
    },
    {
      title: "新进",
      align: "center",
      key: "isNew",
      render(row) {
        return h(
          NTag,
          {
            type: `${row.isNew ? "info" : "warning"}`,
          },
          {
            default: () => `${row.isNew ? "Y" : "N"}`,
          }
        );
      },
    },
    {
      title: "操作",
      align: "center",
      key: "action",
      render(row) {
        return h(
          "span",
          {
            style: {
              cursor: "pointer",
              color: "#2080f0",
              fontSize: "13px",
            },
            onClick: () => fn(row),
          },
          {
            default: () => `编辑`,
          }
        );
      },
    },
  ]);
}

export const subjectColumns = (fn) => {

  return ref([
    {
      type: "selection",
    },
    {
      title: "题目",
      align: "center",
      key: "title",
    },
    {
      title: "选项A",
      align: "center",
      key: "A",
    },
    {
      title: "选项B",
      align: "center",
      key: "B",
    },
    {
      title: "选项C",
      align: "center",
      key: "D",
    },
    {
      title: "选项D",
      align: "center",
      key: "D",
    },
    {
      title: "答案",
      align: "center",
      key: "ans",
    },
    {
      title: "操作",
      align: "center",
      key: "action",
      render(row) {
        return h(
          "span",
          {
            style: {
              cursor: "pointer",
              color: "#2080f0",
              fontSize: "13px",
            },
            onClick: () => fn(row),
          },
          {
            default: () => `编辑`,
          }
        );
      },
    },
  ]);
}

export const diseaseColumns = (fn) => {

  return ref([
    {
      type: "selection",
    },
    {
      title: "姓名",
      align: "center",
      key: "name",
    },
    {
      title: "账号",
      align: "center",
      key: "username",
    },
    {
      title: "年龄",
      align: "center",
      key: "age",
    },
    {
      title: "性别",
      align: "center",
      key: "sex",
    },
    {
      title: "血型",
      align: "center",
      key: "bloodType",
    },
    {
      title: "电话",
      align: "center",
      key: "phone",
    },
    {
      title: "症状",
      align: "center",
      key: "symptom",
    },
    {
      title: "医生建议",
      align: "center",
      key: "response",
    },
    {
      title: "诊断医生",
      align: "center",
      key: "doctorUsername",
    },
    {
      title: "操作",
      align: "center",
      key: "action",
      render(row) {
        return h(
          "span",
          {
            style: {
              cursor: "pointer",
              color: "#2080f0",
              fontSize: "13px",
            },
            onClick: () => fn(row),
          },
          {
            default: () => `编辑`,
          }
        );
      },
    },
  ]);
}