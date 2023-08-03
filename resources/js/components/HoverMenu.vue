<script setup lang="ts">
  const props = defineProps<{
    text: String;
    className?: String;
  }>();
</script>

<template>
  <div :class="className">
    {{ text }}
  </div>
</template>

<style scoped>
  div {
    display: none;
    position: absolute;
    z-index: 999;
  }
</style>
