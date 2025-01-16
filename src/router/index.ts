/**
 * @description 路由配置
 * @author Simon
 * @date 2025-1-16
 * @lastModifiedBy Simon
 * @lastModifiedTime 2025-1-16
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue'),
    },
  ],
})

export default router
