<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const { text, className, closeWithDelay, timeout } = defineProps<{
  text: string,
  className?: string,
  closeWithDelay?: boolean,
  timeout?: number
}>();

const isDropdownOpen = ref(false);

let timeoutId: number | null = null;

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function closeDropdownWithDelay() {
  timeoutId = window.setTimeout(() => {
      isDropdownOpen.value = false;
  }, timeout || 1000);
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
    <a role="button" @click="toggleDropdown" style="cursor: pointer;">
      {{ text }}
    </a>

    <ul
      v-show="isDropdownOpen"
      :class="className"
      style="position: absolute;"
      @mouseleave="closeWithDelay ? closeDropdownWithDelay() : undefined"
      @mouseenter="closeWithDelay ? clearCloseDropdownTimeout() : undefined"
      >
      <slot style="display: block;"/>
    </ul>
  </span>
</template>
