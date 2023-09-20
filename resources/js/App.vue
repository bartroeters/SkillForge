<script setup lang="ts">
import TheNavigation from 'components/TheNavigation.vue';
</script>

<template>
  <div class="app-container">
    <TheNavigation />

    <div id="page-title" />

    <RouterView />
  </div>
</template>