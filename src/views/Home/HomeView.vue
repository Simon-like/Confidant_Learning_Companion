<script setup lang="ts">
import WebHeader from '@/components/shared/WebHeader.vue';
import type { NavItemType } from '@/types';

/**
 * @description 首页入口组件，用于登录注册欢迎用户
 * @date 2025/1/19
 */

const WebNavList: NavItemType[] = [
  { id: 0, text: '关于我们', to: '/home1' },
  { id: 1, text: '更多产品', to: '/home2' },
]

</script>

<template>
  <div class="bgImg min-h-screen relative">
    <!-- 移动端大字标题 -->
    <div class="sm:hidden flex flex-col w-full h-[30vh] px-6 pt-[3rem] pb-6 select-none">
      <div class="w-full flex items-center justify-between">
        <div class="bg-logoImg bg-cover size-16 rounded-full"></div>
        <h1 class="text-[3.5rem] text-title">知己学伴</h1>
      </div>
      <h3 class="text-[1.5rem] font-thin text-end mt-4">let's study.</h3>
    </div>
    <!-- Web端头部导航 -->
    <WebHeader :NavItems="WebNavList">

    </WebHeader>
    <!-- Web端大字标题 -->
    <div class=" max-sm:hidden line-jb h-screen space-x-[30px] select-none">
      <div class="w-1/2 md:w-2/5 h-full line-col justify-center space-y-6">
        <h1 class="text-title self-end text-[5rem]">知己学伴</h1>
        <h2 class="self-end text-[2rem]">让学习轻松起来!</h2>
        <h3 class="self-end text-[1rem]">路漫漫其修远</h3>
      </div>
      <div class="max-md:hidden md:w-1/5 h-full line-jc">
        <div class="aspect-square w-4/5 bg-logoImg bg-cover rounded-buttonRadius animate-fade"></div>
      </div>
      <div class="w-1/2 md:w-2/5 h-full flex items-end justify-end">
        <img src="@/assets/images/fulilian_1.png" alt="芙丽琏" class="w-2/5 opacity-0 animate-fade delay-500">
      </div>
    </div>

    <!-- 输入表单弹框 -->
    <router-view v-slot="{ Component }">
      <KeepAlive>
        <transition name="slide">
          <component :is="Component" />
        </transition>
      </KeepAlive>
    </router-view>
  </div>

</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: 1s cubic-bezier(0, 0, 0.2, 1);
}

.slide-enter-from,
.slide-leave-to {
  /* transform: translateY(100%); */
  height: 0;
  opacity: 0;
}
</style>
