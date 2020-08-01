/**
 * @description 入口页面 配置路由
 * @author 一只鱼
 */
import Vue from 'vue';
import App from './App.vue';

// 路由
import VueRouter from 'vue-router';
import routes from './router/router';

Vue.config.productionTip = false;

Vue.use(VueRouter);
const router = new VueRouter({ routes });

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
