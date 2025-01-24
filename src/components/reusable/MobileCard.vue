<script setup lang="ts">
/**
 * @description 移动端表单
 * @date 2025/1/19
 */
const height_arr = [
  {
    label: 'normal',
    class: 'h-[70vh]'
  },
  {
    label: 'big',
    class: 'h-[80vh]'
  },
  {
    label: 'full',
    class: 'h-[98vh]'
  }
]
const props = withDefaults(defineProps<{
  h?: string
  title?: string
}>(), {
  h: 'normal',
  title: ''
})

</script>

<template>
  <div
    class="sm:hidden absolute bottom-0 z-10 w-full bg-foreground rounded-t-cardRadius text-[1.8rem] text-primary px-8 pb-8 flex flex-col items-center"
    :class="`${height_arr.find(item => item.label === props.h)?.class}`">
    <div class="w-1/4 rounded h-3 bg-white mx-auto my-4"></div>
    <div class="mx-auto text-[2rem]" v-if="props.title">{{ props.title }}</div>
    <slot />
  </div>
</template>

<style scoped></style>
