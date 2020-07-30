import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  {
    path: '/test',
    name: 'Test',
    component: () => import(/* webpackChunkName: "test" */ '../views/test/Test.vue'),
  },
  {
    path: '/zujian',
    name: 'Zujian',
    component: () => import(/* webpackChunkName: "zujian" */ '../views/zujian/index.vue'),
    children: [
      {
        path: 'imageViewer',
        name: 'ImageViewer',
        component: (r) => require.ensure([], () => r(require('../views/zujian/ImageViewer.vue')), 'imageviewer')
      }
    ]
  }
];

const router = new VueRouter({
  routes,
});

export default router;
