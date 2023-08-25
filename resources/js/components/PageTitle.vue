<script setup lang="ts">
const { text } = defineProps<{
  text: string;
}>();
</script>

<template>
  <Teleport to="#page-title">
      {{ text }}
  </Teleport>
</template>