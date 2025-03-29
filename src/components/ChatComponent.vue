<template>
  <div v-if="chat"></div>
  <div v-else class="not-selected">
    <q-img class="background-img" fit="contain" src="~/assets/radin.png" alt="Plataform Mascot" />
  </div>
</template>

<style scoped lang="scss">
.not-selected {
  flex: 1;
  width: 100%;
}
.not-selected .background-img {
  height: 100%;
  opacity: 0.1;
}
</style>

<script setup lang="ts">
import type { ChatInfoI } from 'src/interfaces/ChatInterface';

defineProps<{ chat: ChatInfoI | null }>();
</script>
