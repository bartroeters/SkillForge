<script setup lang="ts">
const { text, className, animationDelay } = defineProps<{
  text: String;
  animationDelay?: number;
  className?: String;
}>();
</script>

<template>
  <!-- Wrap the hover menu in a block element along the element(s) to hover over -->
  <div
    :class="[ className, 'is-hover-menu', {'delayed': animationDelay !== undefined} ]"
    :style="{ '--animation-delay': `${animationDelay}ms` }"
    >
    {{ text }}
  </div>
</template>

<style scoped>
.is-hover-menu {
  display: none;
  position: absolute;
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.is-hover-menu.delayed {
  animation: fadeInAndSlideDown 0.2s ease-in-out var(--animation-delay) forwards;
}

.is-hover-menu:not(.delayed) {
  animation: fadeInAndSlideDown 0.2s ease-in-out forwards;
}

@keyframes fadeInAndSlideDown {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
