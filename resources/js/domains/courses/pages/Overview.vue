<script setup lang="ts">
import {courseStore} from '..';

// const courses = courseStore.getters.all;

// const courses = courseStore.actions.getAll();
// console.log(courses);

</script>

<template>
    <course-list :courses="courses"/>
</template>