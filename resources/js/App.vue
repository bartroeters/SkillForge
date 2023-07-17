<script setup lang="ts">
import TheNavigation from 'components/TheNavigation.vue';
</script>

<template>
  <div class="app-container">
    <TheNavigation />

    <div class="page-title">Sticky Title</div>

    <div class="content-container">
      <RouterView />
    </div>
  </div>
</template>