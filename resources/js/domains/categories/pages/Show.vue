<script setup lang="ts">
import PageTitle from 'components/PageTitle.vue';
import { categoryStore } from '..';
import { getCurrentRouteId } from 'services/router';
import { courseStore } from 'domains/courses';

const categoryId = getCurrentRouteId();
const category = categoryStore.getters.byId(categoryId);

const courses = courseStore.getters.all;

categoryStore.actions.getAll();
courseStore.actions.getAll();

const title = `${category.value?.title}`;
</script>

<template>
  <page-title :text="title"/>

  <div v-for="course in courses" :index="course.id">
    {{ course.title }}
  </div>
</template>