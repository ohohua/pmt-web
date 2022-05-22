import { h, resolveComponent } from 'vue'
import { User as userIcon, Disease as diseaseIcon, CommentDotsRegular } from "@vicons/fa";
import { SubjectFilled  } from "@vicons/material";
import { NIcon } from 'naive-ui'

export function createMenu() {

  const renderIcon = (icon) => {
    return () => h(NIcon, null, { default: () => h(icon) })
  }

  return [
    {
      label: () =>
        h(
          resolveComponent('router-link'),
          {
            to: {
              name: 'user-manage',
            }
          },
          {
            default: () => '用户管理'
          }
        ),
      key: 'user-manage',
      icon: renderIcon(userIcon)
    },
    {
      label: () =>
        h(
          resolveComponent('router-link'),
          {
            to: {
              name: 'subject-manage',
            }
          },
          {
            default: () => '题目管理'
          }
        ),
      key: 'subject-manage',
      icon: renderIcon(SubjectFilled)
    },
    {
      label: () =>
        h(
          resolveComponent('router-link'),
          {
            to: {
              name: 'disease-manage',
            }
          },
          {
            default: () => '病例管理'
          }
        ),
      key: 'disease-manage',
      icon: renderIcon(diseaseIcon)
    },
    // {
    //   label: () =>
    //     h(
    //       resolveComponent('router-link'),
    //       {
    //         to: {
    //           name: 'commit-manage',
    //         }
    //       },
    //       {
    //         default: () => '评论管理'
    //       }
    //     ),
    //   key: 'commit-manage',
    //   icon: renderIcon(CommentDotsRegular)
    // },
  ]
}