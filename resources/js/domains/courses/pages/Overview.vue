<script setup lang="ts">
import { computed } from 'vue';
import CourseCatalog from '../components/CourseCatalog.vue';
import { courseStore, getSortedCourses } from '..';
import { categoryStore } from 'domains/categories';
import PageTitle from 'components/PageTitle.vue';

const sortedCourses = computed(() => getSortedCourses());
const categories = categoryStore.getters.all;

courseStore.actions.getAll();
categoryStore.actions.getAll();
</script>

<template>
  <page-title text="Course Catalog" />

  <course-catalog :courses="sortedCourses" :categories="categories"/>
</template>