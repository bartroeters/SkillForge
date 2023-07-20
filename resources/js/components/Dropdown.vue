<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { DropdownProps } from 'types/dropdown';

const props = defineProps<{
  isOpen: Boolean,
  text: String,
  dropdownClass: String,
  toggleClass: String,
  menuClass: String
}>();

const isDropDownOpen = ref(false);
let timeoutId: number | null = null;
let isMouseOverDropdown = false;

function toggleDropdown() {
  isDropDownOpen.value = !isDropDownOpen.value;
}

function closeDropdownWithDelay() {
  timeoutId = window.setTimeout(() => {
    if (!isMouseOverDropdown) {
      isDropDownOpen.value = false;
      timeoutId = null;
    }
  }, 1800);
}

watchEffect(() => {
  if (!isDropDownOpen.value && timeoutId !== null) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
});
</script>

<template>
  <span :class="[dropdownClass, { open: isDropdownOpen }]" ref="dropdown">
    <a :class="toggleClass" role="button" @click="toggleDropdown">
      {{ text }}
    </a>

    <ul v-show="isDropDownOpen" :class="menuClass" @mouseleave="closeDropdownWithDelay">
      <slot />
    </ul>
  </span>
</template>

