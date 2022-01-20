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
  if(to.fullPath === '/index' && from.fullPath === '/login') {}
  next();
});

router.afterEach((to, from) => {
  const store = pinia.useCommonStore();
  store.loadingFinish();
})
export default router;
