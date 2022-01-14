import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
import '@style/index.scss';

import 'vfonts/Lato.css';

import 'vfonts/FiraCode.css';

import router from '@/router/index';
const app = createApp(App);

app.use(naive);

app.use(router);

app.mount('#app');
