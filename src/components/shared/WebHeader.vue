<script setup lang="ts">
/**
 * @description Web端导航栏模板
 */
import type { NavItemType } from '@/types';
const props = defineProps<{
  NavItems: NavItemType[]
}>()
</script>

<template>
  <nav class="max-sm:hidden fixed top-0 line-jb w-full h-[12vh] bg-muted-bg
    opacity-0 animate-topIn shadow-[0_4px_4px_rgba(0,0,0,0.5)] p-8 text-[1rem] select-none">
    <RouterLink class="line-js gap-4" :to="'/home'">
      <div class=" bg-logoImg rounded-full size-10 bg-cover"></div>
      <div class="inner-text-middle text-title-small text-[2rem]">
        <p>知己学伴</p>
      </div>
    </RouterLink>
    <div class="line-je gap-4">
      <RouterLink class="nav-item" :to="item.to" v-for="item in props.NavItems" :key="item.id">{{ item.text }}
      </RouterLink>
      <slot />
    </div>
  </nav>
</template>

<style scoped></style>
