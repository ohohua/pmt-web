import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log('to');
  // console.dir(to);
  // console.log('from');
  // console.dir(from);
  if(to.fullPath === '/index' && from.fullPath === '/login') {}
  next();
});

router.afterEach((to, from) => {

})
export default router;
