const routes = [
  {
    path: '/', 
    redirect: {
      name: 'login'
    } 
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@components/lr-login.vue'),
  },
];

export default routes;
