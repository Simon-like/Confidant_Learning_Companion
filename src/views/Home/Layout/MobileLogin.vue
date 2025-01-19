<script setup lang="ts">
import MobileCard from '@/components/reusable/MobileCard.vue';
import { Button } from '@/components/ui/button'

</script>

<template>
  <MobileCard :h="'normal'">
    <Button variant="secondary" @click.prevent="() => $router.push('/home/register_1')">
      Secondary
    </Button>
  </MobileCard>
</template>

<style scoped></style>
