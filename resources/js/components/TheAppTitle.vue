<script setup lang="ts">
import { isLoggedIn } from 'domains/auth';
import HoverMenu from './HoverMenu.vue';
import { useRoute } from 'vue-router';
</script>

<template>
  <div class="app-title-container" >
    <router-link
      class="app-title"
      :to="isLoggedIn
      ? { name: 'user-dashboard.overview' }
      : { name: 'courses.overview' }"
      >
      <slot />
    </router-link>

    <hover-menu
      :text="isLoggedIn
        ? ((useRoute().name === 'user-dashboard.overview')
          ? 'Viewing dashboard'
          : 'Go to your dashboard')
        : ((useRoute().name === 'courses.overview')
          ? 'Viewing home page'
          : 'Go to home page')"
          class-name="hover-menu"
    />
  </div>
</template>

<style scoped>
  @import '../../css/the-navigation.css';
</style>