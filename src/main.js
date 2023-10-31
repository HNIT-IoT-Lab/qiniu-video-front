import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import router from '@/router';
import '@/assets/style/global.less';
import App from './App.vue';

const app = createApp(App);
app.use(ArcoVue);
app.use(router).mount('#app');
