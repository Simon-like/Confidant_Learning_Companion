<script setup lang="ts">
/**
 * @description 首页入口组件，用于登录注册欢迎用户
 * @date 2025/1/19
 */

</script>

<template>
  <div class="bgImg min-h-screen relative">
    <!-- 移动端大字标题 -->
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
    <!-- Web端大字标题 -->
    <div class=" max-sm:hidden line-jb h-screen space-x-[30px]">
      <div class="w-1/2 md:w-2/5 h-full line-col justify-center space-y-6">
        <h1 class="text-title self-end text-[5rem]">知己学伴</h1>
        <h1 class="self-end text-[2rem] delay-500">让学习轻松起来!</h1>
        <h1 class="self-end text-[1rem] delay-700">路漫漫其修远</h1>
      </div>
      <div class="max-md:hidden md:w-1/5 h-full line-jc">
        <div class="aspect-square w-4/5 bg-logoImg bg-cover rounded-buttonRadius animate-fade"></div>
      </div>
      <div class="w-1/2 md:w-2/5 h-full flex items-end justify-end">
        <img src="@/assets/images/fulilian_1.png" alt="芙丽琏">
      </div>
    </div>
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
