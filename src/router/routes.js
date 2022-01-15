const _viewModules = import.meta.glob('/src/views/**/*.vue');
const views = {};
const prefixLen = '/src/views/'.length;
const suffixLen = '.vue'.length;
for (const path in _viewModules) {
  if (_viewModules.hasOwnProperty(path)) {
    // path like /src/views/a/../b.vue, we need key [a/...].
    views[path.substring(prefixLen, path.length - suffixLen)] = _viewModules[path];
    console.log(path.substring(prefixLen, path.length - suffixLen));
  }
}

const routes = [
  {
    path: '/',
    name: 'index',
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
    path: '/home',
    name: 'home',
    component: views['home/lr-home'],
    meta: {
      title: '主页'
    },
    children: [
      
    ]
  },
];

export default routes;
