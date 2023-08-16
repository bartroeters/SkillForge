<script setup lang="ts">
import { ref, onMounted } from 'vue';

const { text, className, delay } = defineProps<{
  text: String;
  className?: String;
  delay?: number;
}>();

const isHoverMenuVisible = ref(false);

onMounted(() => {
  if (delay) {
    setTimeout(() => {
      isHoverMenuVisible.value = true;
    }, delay);
  } else {
    isHoverMenuVisible.value = true;
  }
});
</script>

<template>
  <div :class="className" v-show="isHoverMenuVisible">
    {{ text }}
  </div>
</template>

<style scoped>
div {
  display: none;
  position: absolute;
  z-index: 999;
}
div.show-menu .show-menu {
  display: block;
}
</style>
