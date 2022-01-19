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
    meta: {
      title: '主页'
    },
    children: [
      {
        path: '/index/home',
        name:'home',
        component: views['home/lr-home'],
        meta: {
          title: 'home页面'
        }
      },
      {
        path: '/index/home1',
        name:'home1',
        component: views['home/lr-home'],
        meta: {
          title: 'home1页面'
        }
      },
      {
        path: '/index/home2',
        name:'home2',
        component: views['home/lr-home'],
        meta: {
          title: 'home2页面'
        }
      },
      {
        path: '/index/home3',
        name:'home3',
        component: views['home/lr-home'],
        meta: {
          title: 'home3页面'
        }
      }
    ]
  },
];

export default routes;
