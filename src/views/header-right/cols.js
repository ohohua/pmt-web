import { h } from 'vue';
import { useRouter } from "vue-router";

export const createCols = () => {
  const router = useRouter();
  return [
    {
      title: "患者",
      key: "name",
      align: "center",
    },
    {
      title: "操作",
      key: "actions",
      align: "center",
      render: (row) => {
        return h(
          "div",
          {
            style: {
              color: '#18A058'
            },
            class: ['cp'],
            onClick: () => {
              router.push({ name: 'receive', params: { username: row.username } })
            }
          },
          {
            default: () => '接诊'
          }
        )
      }
    },
  ]
}


export const createNewsCols = () => {
  const router = useRouter();
  return [
    {
      title: "主诉",
      key: "symptom",
      align: "center",
    },
    {
      title: "答复",
      key: "response",
      align: "center",
    },
    // {
    //   title: "操作",
    //   key: "actions",
    //   align: "center",
    //   render: (row) => {
    //     return h(
    //       "div",
    //       {
    //         style: {
    //           color: '#18A058'
    //         },
    //         class: ['cp'],
    //         onClick: () => {
    //           router.push({ name: 'receive', params: { username: row.username } })
    //         }
    //       },
    //       {
    //         default: () => '接诊'
    //       }
    //     )
    //   }
    // },
  ]
}
