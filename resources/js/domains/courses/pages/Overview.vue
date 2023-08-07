<script setup lang="ts">
import CourseList from '../components/CourseList.vue';

import {courseStore} from '..';
import { categoryStore } from 'domains/categories';

const courses = courseStore.getters.all;
const categories = categoryStore.getters.all;

courseStore.actions.getAll();
categoryStore.actions.getAll();
</script>

<template>
  <course-list :courses="courses" :categories="categories"/>
</template>