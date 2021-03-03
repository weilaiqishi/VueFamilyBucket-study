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
        path: '/layout',
        name: 'Layout',
        component: () => import(/* webpackChunkName: "layout" */ '../views/layout/index.vue'),
        children: [
            {
                path: 'centerDivFullFlex',
                name: 'CenterDivFullFlex',
                component: (r) => require.ensure([], () => r(require('../views/layout/centerDivFullFlex.vue')), 'centerdivfullflex')
            },
            {
                path: 'centerDivFullGrid',
                name: 'CenterDivFullGrid',
                component: (r) => require.ensure([], () => r(require('../views/layout/centerDivFullGrid.vue')), 'centerdivfullgrid')
            },
            {
                path: 'centerDivFullJS',
                name: 'CenterDivFullJS',
                component: (r) => require.ensure([], () => r(require('../views/layout/centerDivFullJS.vue')), 'centerdivfulljs')
            }
        ]
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
                component: (r) => require.ensure([], () => r(require('../views/zujian/VirtualTable.vue')), 'virtualtable')
            },
            {
                path: 'd2Form',
                name: 'd2Form',
                component: (r) => require.ensure([], () => r(require('../views/zujian/D2Form.vue')), 'd2Form')
            }
        ]
    },
    {
        path: '/iview',
        name: 'Iview',
        component: () => import(/* webpackChunkName: "iview" */ '../views/iview/index.vue'),
        children: [
            {
                path: 'iform',
                name: 'form',
                component: (r) => require.ensure([], () => r(require('../views/iview/iform.vue')), 'iform')
            },
            {
                path: 'idisplay',
                name: 'display',
                component: (r) => require.ensure([], () => r(require('../views/iview/idisplay.vue')), 'idisplay')
            },
            {
                path: 'ialert',
                name: 'alert',
                component: (r) => require.ensure([], () => r(require('../views/iview/ialert.vue')), 'ialert')
            },
            {
                path: 'itable-render',
                name: 'table-render',
                component: (r) => require.ensure([], () => r(require('../views/iview/itable-render.vue')), 'itable-render')
            },
            {
                path: 'itable-slot',
                name: 'table-slot',
                component: (r) => require.ensure([], () => r(require('../views/iview/itable-slot.vue')), 'itable-slot')
            },
            {
                path: 'itable-slot1',
                name: 'table-slot1',
                component: (r) => require.ensure([], () => r(require('../views/iview/itable-slot1.vue')), 'itable-slot1')
            },
            {
                path: 'itree',
                name: 'tree',
                component: (r) => require.ensure([], () => r(require('../views/iview/itree.vue')), 'itree')
            },
        ]
    },
]

const router = new VueRouter({
    routes,
})

export default router
export { routes }
