import Vue from 'vue';
import VueRouter from 'vue-router';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Container',
    redirect: '/station',
    component: () => import('@/views/Container.vue'),
    children: [
      {
        path: '/station',
        component: () => import('@/views/station/Station.vue'),
        redirect: '/station/page1',
        children: [
          { path: '/station/page1', component: () => import('@/views/station/Page1.vue') },
          { path: '/station/page2', component: () => import('@/views/station/Page2.vue') },
          { path: '/station/page3', component: () => import('@/views/station/Page3.vue') },
          { path: '/station/page4', component: () => import('@/views/station/Page4.vue') },
          { path: '/station/page5', component: () => import('@/views/station/Page5.vue') },
          { path: '/station/page6', component: () => import('@/views/station/Page6.vue') },
          { path: '/station/page7', component: () => import('@/views/station/Page7.vue') },
        ],
      },
      {
        path: '/data',
        component: () => import('@/views/data/Data.vue'),
        redirect: '/data/page1',
        children: [
          { path: '/data/page1', component: () => import('@/views/data/Page1.vue') },
          { path: '/data/page2', component: () => import('@/views/data/Page2.vue') },
        ],
      },
      {
        path: '/input',
        component: () => import('@/views/input/Input.vue'),
        redirect: '/input/page1',
        children: [
          { path: '/input/page1', component: () => import('@/views/input/Page1.vue') },
          { path: '/input/page2', component: () => import('@/views/input/Page2.vue') },
        ],
      },
      {
        path: '/map',
        component: () => import('@/views/map/Map.vue'),
      },
      {
        path: '/video',
        component: () => import('@/views/video/Video.vue'),
      },
      {
        path: '/search',
        component: () => import('@/views/search/Search.vue'),
        redirect: '/search/page1',
        children: [
          { path: '/search/page1', component: () => import('@/views/search/Page1.vue') },
          { path: '/search/page2', component: () => import('@/views/search/Page2.vue') },
          { path: '/search/page3', component: () => import('@/views/search/Page3.vue') },
          { path: '/search/page4', component: () => import('@/views/search/Page4.vue') },
          { path: '/search/page5', component: () => import('@/views/search/Page5.vue') },
          { path: '/search/page6', component: () => import('@/views/search/Page6.vue') },
        ],
      },
      {
        path: '/statistic',
        component: () => import('@/views/statistic/Statistic.vue'),
        redirect: '/statistic/page1',
        children: [
          { path: '/statistic/page1', component: () => import('@/views/statistic/Page1.vue') },
          { path: '/statistic/page2', component: () => import('@/views/statistic/Page2.vue') },
          { path: '/statistic/page3', component: () => import('@/views/statistic/Page3.vue') },
          { path: '/statistic/page4', component: () => import('@/views/statistic/Page4.vue') },
          { path: '/statistic/page5', component: () => import('@/views/statistic/Page5.vue') },
          { path: '/statistic/page6', component: () => import('@/views/statistic/Page6.vue') },
        ],
      },
      {
        path: '/push',
        component: () => import('@/views/push/Push.vue'),
        redirect: '/push/page1',
        children: [
          { path: '/push/page1', component: () => import('@/views/push/Page1.vue') },
          { path: '/push/page2', component: () => import('@/views/push/Page2.vue') },
          { path: '/push/page3', component: () => import('@/views/push/Page3.vue') },
          { path: '/push/page4', component: () => import('@/views/push/Page4.vue') },
        ],
      },
      {
        path: '/warning',
        component: () => import('@/views/warning/Warning.vue'),
      },
    ],
    beforeEnter: (to, from, next) => {
      const logined = sessionStorage.getItem('logined');
      if (!logined) {
        next({ path: '/login' });
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: (to, from, next) => {
      const logined = sessionStorage.getItem('logined');
      if (logined) {
        next({ path: '/' });
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
