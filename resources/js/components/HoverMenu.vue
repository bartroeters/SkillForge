<script setup lang="ts">
import { ref } from 'vue';
import { HoverMenuProps, isHoverMenuVisible } from 'types/hover-menu';

const props = defineProps<{
  isVisible: Boolean,
  text: String,
  className: String
}>();
</script>

<template>
  <div :class="className" ref="hoverMenu">
    {{ text }}
  </div>
</template>
