import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index'
  },
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
      },
      {
        path: 'virtualList',
        name: 'VirtualList',
        component: (r) => require.ensure([], () => r(require('../views/zujian/VirtualList.vue')), 'virtuallist')
      },
      {
        path: 'virtualTable',
        name: 'VirtualTable',
        component: (r) => require.ensure([], () => r(require('../views/zujian/VirtualTable.vue')), 'virtualTable')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
})

export default router
export { routes }
