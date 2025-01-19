<script setup lang="ts">
/**
 * @description 首页，用于登录注册欢迎用户
 * @date 2025/1/19
 */

</script>

<template>
  <div class="bgImg min-h-screen">
    <!-- 移动端 -->
    <div class="sm:hidden flex flex-col w-full h-[30vh] px-6 pt-[3rem] pb-6">
      <div class="w-full flex items-center justify-between">
        <div class="bg-logoImg bg-cover size-16 rounded-full"></div>
        <h1 class="text-[3.5rem] text-title">知己学伴</h1>
      </div>
      <p class="text-[1.5rem] font-thin text-end mt-4">let's study.</p>
    </div>
    <!-- 移动端输入表单弹框 -->
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
  transform: translateY(100%);
  opacity: 0;
}
</style>
