import Vue from 'vue';
import ElementUI from 'element-ui';
import 'xe-utils';
import VXETable from 'vxe-table';
import VXETablePluginElement from 'vxe-table-plugin-element';
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx';

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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
