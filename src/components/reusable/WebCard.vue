<script setup lang="ts">
/**
 * @description 网页端自适应卡片
 */

const props = withDefaults(defineProps<{
  isUnfold?: boolean
  title?: string
}>(), {
  isUnfold: false,
  title: ''
})
</script>

<template>
  <div class=" max-sm:hidden blue-ring-card rounded-buttonRadius px-6" :class="isUnfold ? 'line-js' : 'line-col'">
    <div class="rounded bg-foreground" :class="isUnfold ? ' h-1/4 w-2 my-auto mx-4' : 'w-1/4 h-2 mx-auto my-4'"></div>
    <div class="text-[2rem] text-foreground" v-if="props.title"
      :class="isUnfold ? 'text-vertical-lr my-auto' : 'mx-auto'">{{ props.title }}</div>
    <slot />
  </div>
</template>

<style scoped></style>
