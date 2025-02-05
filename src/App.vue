<script setup lang="ts">

</script>

<template>
  <router-view v-slot="{ Component, route }">
    <KeepAlive>
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </KeepAlive>
  </router-view>
</template>

<style scoped></style>
