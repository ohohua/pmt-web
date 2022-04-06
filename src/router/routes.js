const _viewModules = import.meta.glob('/src/views/**/*.vue');
const views = {};
const prefixLen = '/src/views/'.length;
const suffixLen = '.vue'.length;
for (const path in _viewModules) {
  if (_viewModules.hasOwnProperty(path)) {
    // path like /src/views/a/../b.vue, we need key [a/...].
    views[path.substring(prefixLen, path.length - suffixLen)] = _viewModules[path];
  }
}

const routes = [
  {
    path: '/',
    redirect: { name: 'login' },
  },
  {
    path: '/login',
    name: 'login',
    component: views['common/lr-login'],
    meta: {
      title: '登录'
    }
  },
  {
    path:'/register',
    name: 'register',
    component: views['common/register'],
    meta: {
      title: '注册'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: views['index'],
    redirect: { name: 'symptom' },
    meta: {
      title: '主页'
    },
    children: [
      {
        path: '/index/symptom',
        name: 'symptom',
        component: views['symptom/symptom'],
        meta: {
          title: '症状描述'
        }
      },
      {
        path: '/index/questionnaire',
        name: 'questionnaire',
        component: views['questionnaire/questionnaire'],
        meta: {
          title: '心理测试'
        }
      },
      {
        path: '/index/community',
        name: 'community',
        component: views['community/community'],
        meta: {
          title: '社区'
        }
      },
      {
        path: '/index/profile',
        name: 'profile',
        component: views['profile/profile'],
        meta: {
          title: '个人中心'
        }
      },
      {
        path: '/index/editProfile',
        name: 'editProfile',
        component: views['profile/edit-profile'],
        meta: {
          title: '个人设置'
        }
      },
      {
        path: '/index/receive/:username',
        name: 'receive',
        component: views['header-right/receive'],
        meta: {
          title: '医生接诊'
        }
      },
      {
        path: '/index/settings',
        name: 'settings',
        component: views['settings/index'],
        meta: {
          title: '后台管理'
        },
        redirect: { name: 'user-manage' },
        children: [
          {
            path: '/index/settings/user-manage',
            name: 'user-manage',
            component: views['settings/user-manage'],
            meta: {
              title: '用户管理'
            }
          },
          {
            path: '/index/settings/subject-manage',
            name: 'subject-manage',
            component: views['settings/subject-manage'],
            meta: {
              title: '题目管理'
            }
          },
          {
            path: '/index/settings/disease-manage',
            name: 'disease-manage',
            component: views['settings/disease-manage'],
            meta: {
              title: '病例管理'
            }
          },
          {
            path: '/index/settings/commit-manage',
            name: 'commit-manage',
            component: views['settings/commit-manage'],
            meta: {
              title: '评论管理'
            }
          }
        ]
      }
    ]
  },
];

export default routes;
