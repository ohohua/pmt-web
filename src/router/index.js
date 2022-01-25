import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';
import { pinia } from '@store/index.js'



const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = pinia.useCommonStore();
  store.loadingStart();

  if (to.path === '/login') {
    next()
  } else if (!window.localStorage.getItem('COMMAND_CENTER_token')) {
    next({ name: 'login' })
  } else {
    next();
  } 
});

router.afterEach((to, from) => {
  const store = pinia.useCommonStore();
  store.loadingFinish();
})
export default router;
