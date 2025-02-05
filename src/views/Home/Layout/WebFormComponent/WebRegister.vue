<script setup lang="ts">
import WebCard from '@/components/reusable/WebCard.vue';
import router from '@/router';

/**
 * @description 网页端注册页
 */

const onOpen = () => {
  router.push('/home/weblogin');
}
</script>

<template>
  <WebCard class="!w-100-minus-160 h-[500px] select-none" :is-unfold="true">
    <div class="button" @click="onOpen">点我</div>
  </WebCard>
</template>

<style scoped></style>
