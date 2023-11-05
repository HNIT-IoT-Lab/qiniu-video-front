import { createApp } from 'vue';
import ArcoVue, { Message } from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import router from '@/router';
import '@/assets/style/global.less';
import { createPinia } from 'pinia';
import 'virtual:svg-icons-register';

import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();
Message._context = app._context;
app.use(ArcoVue);
app.use(pinia);
app.use(router).mount('#app');
