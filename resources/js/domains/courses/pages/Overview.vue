<script setup lang="ts">
import CourseCatalog from '../components/CourseCatalog.vue';

import { courseStore } from '..';
import { categoryStore } from 'domains/categories';

const courses = courseStore.getters.all;
const categories = categoryStore.getters.all;

courseStore.actions.getAll();
categoryStore.actions.getAll();
</script>

<template>
  <course-catalog :courses="courses" :categories="categories"/>
</template>