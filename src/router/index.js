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
    redirect: '/map',
    component: () => import('@/views/Container.vue'),
    children: [
      {
        path: '/basic',
        component: () => import('@/views/basic/Basic.vue'),
        redirect: '/basic/page1',
        children: [
          { path: '/basic/page1', component: () => import('@/views/basic/Page1.vue') },
          { path: '/basic/page2', component: () => import('@/views/basic/Page2.vue') },
          { path: '/basic/page3', component: () => import('@/views/basic/Page3.vue') },
          { path: '/basic/page4', component: () => import('@/views/basic/Page4.vue') },
          { path: '/basic/page5', component: () => import('@/views/basic/Page5.vue') },
          { path: '/basic/page6', component: () => import('@/views/basic/Page6.vue') },
          { path: '/basic/page7', component: () => import('@/views/basic/Page7.vue') },
          { path: '/basic/page8', component: () => import('@/views/basic/Page8.vue') },
          { path: '/basic/page9', component: () => import('@/views/basic/Page9.vue') },
          { path: '/basic/page10', component: () => import('@/views/basic/Page10.vue') },
          { path: '/basic/page11', component: () => import('@/views/basic/Page11.vue') },
          { path: '/basic/page12', component: () => import('@/views/basic/Page12.vue') },
        ],
      },
      {
        path: '/management',
        component: () => import('@/views/management/Management.vue'),
        redirect: '/management/page1',
        children: [
          { path: '/management/page1', component: () => import('@/views/management/Page1.vue') },
          { path: '/management/page2', component: () => import('@/views/management/Page2.vue') },
          { path: '/management/page3', component: () => import('@/views/management/Page3.vue') },
          { path: '/management/page4', component: () => import('@/views/management/Page4.vue') },
          { path: '/management/page5', component: () => import('@/views/management/Page5.vue') },
          { path: '/management/page6', component: () => import('@/views/management/Page6.vue') },
          { path: '/management/page7', component: () => import('@/views/management/Page7.vue') },
          { path: '/management/page8', component: () => import('@/views/management/Page8.vue') },
          { path: '/management/page9', component: () => import('@/views/management/Page9.vue') },
          { path: '/management/page10', component: () => import('@/views/management/Page10.vue') },
          { path: '/management/page11', component: () => import('@/views/management/Page11.vue') },
          { path: '/management/page12', component: () => import('@/views/management/Page12.vue') },
        ],
      },
      {
        path: '/water',
        component: () => import('@/views/water/Water.vue'),
        redirect: '/water/page1',
        children: [
          { path: '/water/page1', component: () => import('@/views/water/Page1.vue') },
          { path: '/water/page2', component: () => import('@/views/water/Page2.vue') },
          { path: '/water/page3', component: () => import('@/views/water/Page3.vue') },
          { path: '/water/page4', component: () => import('@/views/water/Page4.vue') },
          { path: '/water/page5', component: () => import('@/views/water/Page5.vue') },
          { path: '/water/page6', component: () => import('@/views/water/Page6.vue') },
        ],
      },
      {
        path: '/effect',
        component: () => import('@/views/effect/Effect.vue'),
        redirect: '/effect/page1',
        children: [
          { path: '/effect/page1', component: () => import('@/views/effect/Page1.vue') },
          { path: '/effect/page2', component: () => import('@/views/effect/Page2.vue') },
        ],
      },
      {
        path: '/performance',
        component: () => import('@/views/performance/Performance.vue'),
      },
      {
        path: '/report',
        component: () => import('@/views/report/Report.vue'),
        redirect: '/report/page1',
        children: [
          { path: '/report/page1', component: () => import('@/views/report/Page1.vue') },
          { path: '/report/page2', component: () => import('@/views/report/Page2.vue') },
          { path: '/report/page3', component: () => import('@/views/report/Page3.vue') },
          { path: '/report/page4', component: () => import('@/views/report/Page4.vue') },
        ],
      },
      {
        path: '/map',
        component: () => import('@/views/map/Map.vue'),
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
