import App from '../App.vue';

export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        component: (r) => require.ensure([], () => r(require('../container/Home')), 'home'),
      },
    ],
  },
];
