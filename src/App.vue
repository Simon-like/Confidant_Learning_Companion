<script setup lang="ts">

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <KeepAlive>
      <transition name="fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </KeepAlive>
  </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>