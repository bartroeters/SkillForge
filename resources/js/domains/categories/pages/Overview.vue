<script setup lang="ts">
import CategoryCatalog from '../components/CategoryCatalog.vue';

import { courseStore } from 'domains/courses';
import { categoryStore } from '..';

const courses = courseStore.getters.all;
const categories = categoryStore.getters.all;

courseStore.actions.getAll();
categoryStore.actions.getAll();
</script>

<template>
  <category-catalog :courses="courses" :categories="categories"/>
</template>