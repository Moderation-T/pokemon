/**
 * @description 入口页面 配置路由
 * @author 一只鱼
 */
import Vue from 'vue';
import App from './App.vue';

// 导入echarts
import ECharts from 'vue-echarts';

// 路由
import VueRouter from 'vue-router';
import routes from './router/router';

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({ routes });

Vue.component('v-chart', ECharts);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
