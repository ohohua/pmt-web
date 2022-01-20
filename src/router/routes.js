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
    path: '/index',
    name: 'index',
    component: views['index'],
    redirect:{ name: 'symptom' },
    meta: {
      title: '主页'
    },
    children: [
      {
        path: '/index/symptom',
        name:'symptom',
        component: views['symptom/symptom'],
        meta: {
          title: '症状描述'
        }
      },
      {
        path: '/index/questionnaire',
        name:'questionnaire',
        component: views['questionnaire/questionnaire'],
        meta: {
          title: '心理测试'
        }
      },
      {
        path: '/index/community',
        name:'community',
        component: views['community/community'],
        meta: {
          title: '社区'
        }
      },
    ]
  },
];

export default routes;
