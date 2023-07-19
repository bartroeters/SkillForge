<script setup lang="ts">
import { isLoggedIn } from '@/domains/auth';
import HoverMenu from './HoverMenu.vue';
</script>

<template>
  <div
    class="app-title-container"
    @mouseenter="HoverMenu.toggleHoverMenu"
    @mouseleave="HoverMenu.toggleHoverMenu"
    >
    <router-link
      class="app-title"
      :to="isLoggedIn
      ? { name: 'users.dashboard' }
      : { name: 'courses.overview' }"
      >
      <slot />
    </router-link>

    <hover-menu
      :is-visible="HoverMenu.isHoverMenuVisible"
      :text="isLoggedIn
      ? 'Go to dashboard'
      : 'Go to home page'"
      class-name="hover-menu"
      />
  </div>
</template>

<style scoped>
@import '../../css/the-navigation.css';
</style>