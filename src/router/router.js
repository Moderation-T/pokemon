/**
 * @description router
 */

import App from '../App.vue';
// home 页
import Home from '../container/Home.vue';
// 宝可梦的 18 种属性
import Attributes from '../container/Attributes';

export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/attributes',
        component: Attributes,
      },
    ],
  },
];
