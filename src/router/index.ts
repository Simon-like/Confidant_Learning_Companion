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
        // 移动端表单
        {
          path: '',
          name: 'MobileLogin',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileLogin.vue'),
          meta: { transition: 'slideBottom' },
        },
        {
          path: 'register_1',
          name: 'MobileRegistry_1',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileRegistry_1.vue'),
          meta: { transition: 'slideBottom' },
        },
        {
          path: 'register_2',
          name: 'MobileRegistry_2',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileRegistry_2.vue'),
          meta: { transition: 'slideBottom' },
        },
        {
          path: 'register_3',
          name: 'MobileRegistry_3',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileRegistry_3.vue'),
          meta: { transition: 'slideBottom' },
        },
        {
          path: 'register_4',
          name: 'MobileRegistry_4',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileRegistry_4.vue'),
          meta: { transition: 'slideBottom' },
        },
        {
          path: 'forget_1',
          name: 'MobileForget_1',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileForget_1.vue'),
          meta: { transition: 'slideBottom' },
        },
        {
          path: 'forget_2',
          name: 'MobileForget_2',
          component: () => import('@/views/Home/Layout/MobileFormComponent/MobileForget_2.vue'),
          meta: { transition: 'slideBottom' },
        },
        // 网页端表单
        {
          path: 'weblogin',
          name: 'WebLogin',
          component: () => import('@/views/Home/Layout/WebFormComponent/WebLogin.vue'),
          meta: { transition: 'sideRight' },
        },
        {
          path: 'webregister',
          name: 'WebRegister',
          component: () => import('@/views/Home/Layout/WebFormComponent/WebRegister.vue'),
          meta: { transition: 'sideRight' },
        },
        {
          path: 'webforget_1',
          name: 'WebForget_1',
          component: () => import('@/views/Home/Layout/WebFormComponent/WebForget_1.vue'),
          meta: { transition: 'sideRight' },
        },
      ],
    },
  ],
})

export default router
