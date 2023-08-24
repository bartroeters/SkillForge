<script setup lang="ts">
const { text, className, animationDelay, fadeAnimationDuration, opacity } = defineProps<{
  text: String;
  className?: String;
  animationDelay?: number;
  fadeAnimationDuration?: number;
  opacity?: number;
}>()
</script>

<!-- IMPORTANT: Enabling Hover Menu Visibility -->
<!-- To make the hover menu appear when hovering over an element, follow these steps: -->
<!-- 1. Wrap the hover menu in a parent element along with the element(s) that trigger the hover. -->
<!-- 2. In your CSS, target the parent element's hover state and adjust the hover menu's display property: -->
<!-- Example: .example-hover-wrapper:hover .hover-menu-immutable { display: block; } -->
<!-- This technique utilizes CSS to manage hover interaction without Vue event handlers. -->

<template>
  <div
    :class="className"
    class="hover-menu-default-styling hover-menu-immutable"
    :style="{
      '--animation-delay': `${animationDelay || 0}ms`,
      '--fade-animation-duration': `${fadeAnimationDuration || 300}ms`,
      '--opacity': opacity
    }"
  >
    {{ text }}
  </div>
</template>

<style scoped>
/* Default styling. Apply CSS in the parent component to overwrite defaults. */
.hover-menu-default-styling {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Immutable properties. */
.hover-menu-immutable {
  display: none; /* Initially hidden */
  position: absolute;
  opacity: 0;
  z-index: 999;
  /* Animation settings using props */
  animation: fadeInAndSlideDown var(--fade-animation-duration) ease-in-out var(--animation-delay) forwards;
}

@keyframes fadeInAndSlideDown {
  0% {
    opacity: 0;
  }
  100% {
    /* Set opacity using props */
    opacity: var(--opacity, 1);
  }
}
</style>