<script setup lang="ts">
import CourseList from '../components/CourseList.vue';

import {courseStore} from '..';

const courses = courseStore.getters.all;

courseStore.actions.getAll();
// console.log(courses);

</script>

<template>
    <div>dsjhgfdhgfdyhgfd</div>
    <course-list :courses="courses"/>
</template>