<script setup lang="ts">
import WebCard from '@/components/reusable/WebCard.vue';
import router from '@/router';

/**
 * @description Web端登录表
 */
const onOpen = () => {
  router.push('/home/webregister');
}
</script>

<template>
  <WebCard class="!w-[300px] h-[500px] select-none">
    <div class="button" @click="onOpen">点我</div>
  </WebCard>
</template>

<style scoped></style>
