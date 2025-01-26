/**
 * @description 路由配置
 * @author Simon
 * @date 2025-1-16
 * @lastModifiedBy Simon
 * @lastModifiedTime 2025-1-16
 */
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    // 登录注册主页
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue'),
      children: [
        {
          path: '',
          name: 'MobileLogin',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileLogin.vue'),
        },
        {
          path: 'register_1',
          name: 'MobileRegistry_1',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileRegistry_1.vue'),
        },
        {
          path: 'register_2',
          name: 'MobileRegistry_2',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileRegistry_2.vue'),
        },
        {
          path: 'register_3',
          name: 'MobileRegistry_3',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileRegistry_3.vue'),
        },
        {
          path: 'register_4',
          name: 'MobileRegistry_4',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileRegistry_4.vue'),
        },
        {
          path: 'forget_1',
          name: 'MobileForget_1',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileForget_1.vue'),
        },
        {
          path: 'forget_2',
          name: 'MobileForget_2',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileForget_2.vue'),
        },
      ],
    },
  ],
})

export default router
