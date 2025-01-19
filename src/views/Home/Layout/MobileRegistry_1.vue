<script setup lang="ts">
import MobileCard from '@/components/reusable/MobileCard.vue';
import { Button } from '@/components/ui/button'
</script>

<template>
  <MobileCard :h="'big'">
    <Button variant="secondary" @click.prevent="() => $router.push('/home')">
      Secondary
    </Button>
  </MobileCard>
</template>

<style scoped></style>
