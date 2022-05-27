import Vue from 'vue';
import ElementUI from 'element-ui';
import 'xe-utils';
import VXETable from 'vxe-table';
import VXETablePluginElement from 'vxe-table-plugin-element';
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx';

import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

import 'vxe-table/lib/style.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'vxe-table-plugin-element/dist/style.css';

import '@/assets/icon/iconfont.css';

Vue.use(ElementUI);
Vue.use(VXETable);
VXETable.use(VXETablePluginElement);
VXETable.use(VXETablePluginExportXLSX);

let host = '';

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  host = '59.110.22.67';
} else {
  host = 'localhost';
  host = '59.110.22.67';
}

const API_BASE_URL = `http://${host}:8005`;

axios.defaults.baseURL = API_BASE_URL;

Vue.http = Vue.prototype.$http = axios;

Vue.prototype.$API_BASE_URL = API_BASE_URL;
Vue.prototype.$HOST = host;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
