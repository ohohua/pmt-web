import { h, ref } from 'vue';
import { NAvatar, NTag } from "naive-ui";


export const userColumns = () => {
  const itemHandle = (row) => {
    console.log(row);
  };
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
      title: "新人",
      align: "center",
      key: "isNew",
      render(row) {
        return h(
          NTag,
          {
            type: `${row.isNew ? "info" : "warning"}`,
          },
          {
            default: () => `${row.isNew ? "new" : "old"}`,
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
            onClick: () => itemHandle(row),
          },
          {
            default: () => `编辑`,
          }
        );
      },
    },
  ]);
}