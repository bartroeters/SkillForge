<script setup lang="ts">
import { ref, watchEffect } from 'vue';

const isDropdownOpen = ref(false);
let timeoutId: number | null = null;
let isMouseOverDropdown = false;

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function closeDropdownWithDelay() {
  timeoutId = window.setTimeout(() => {
    if (!isMouseOverDropdown) {
      isDropdownOpen.value = false;
      timeoutId = null;
    }
  }, 1800);
}

watchEffect(() => {
  if (!isDropdownOpen.value && timeoutId !== null) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
});
</script>

<template>
  <span class="dropdown" :class="{ open: isDropdownOpen }">
    <a class="dropdown-toggle" role="button" @click="toggleDropdown">
      Browse Courses
    </a>

    <ul v-show="isDropdownOpen" class="dropdown-menu" @mouseleave="closeDropdownWithDelay">
      <slot />
    </ul>
  </span>
</template>

<style scoped>
  @import '../../css/the-navigation.css';
</style>