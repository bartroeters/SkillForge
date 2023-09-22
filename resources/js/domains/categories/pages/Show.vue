<script setup lang="ts">
import PageTitle from 'components/PageTitle.vue';
import { categoryStore } from '..';
import { courseStore, getSortedCourses } from 'domains/courses';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import CourseCatalog from 'domains/courses/components/CourseCatalog.vue';

const sortedCourses = computed(() => getSortedCourses());
const route = useRoute();
const categoryId = route.params.id as string;
const category = categoryStore.getters.byId(parseInt(categoryId));

const filteredCourses = computed(() => {
    if (categoryId) {
        return sortedCourses.value.filter(course => course.categoryIds.includes(parseInt(categoryId)));
    } else {
        return sortedCourses.value;
    }
})

categoryStore.actions.getAll();
courseStore.actions.getAll();

const title = computed (() => category.value?.title.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' '));
</script>

<template>
  <page-title :text="`Courses in Category ` + title"/>

  <course-catalog :courses="filteredCourses" :category="category" />
</template>