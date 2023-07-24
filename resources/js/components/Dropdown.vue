<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const { text, className, withDelay } = defineProps<{
  text: string,
  className: string,
  withDelay?: boolean,
}>();

const isDropdownOpen = ref(false);

let timeoutId: number | null = null;

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function closeDropdownWithDelay() {
  timeoutId = window.setTimeout(() => {
      isDropdownOpen.value = false;
  }, 1800);
}

function clearCloseDropdownTimeout() {
  if (timeoutId !== null) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
}

watchEffect(() => {
  if (!isDropdownOpen.value && timeoutId !== null) {
    window.clearTimeout(timeoutId);
  }
});
</script>

<template>
  <span>
    <a role="button" @click="toggleDropdown">
      {{ text }}
    </a>

    <ul
      v-show="isDropdownOpen"
      :class="className"
      @mouseleave="withDelay ? closeDropdownWithDelay : undefined"
      @mouseenter="withDelay ? clearCloseDropdownTimeout : undefined"
      >
      <slot />
    </ul>
  </span>
</template>

<style scoped>
a {
  cursor: pointer;
}

ul {
  position: absolute;
}

ul a {
  display: block;
}
</style>