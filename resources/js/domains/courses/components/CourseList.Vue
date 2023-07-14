<script setup lang="ts">
import { PropType } from 'vue';
import { Course } from '../types';

const props = defineProps({
    courses: { type: Array as PropType<Course[]> }
});

</script>

<template>
    <div></div>

    <div v-for="(course, index) in props.courses" :key="index">
        <div>{{ course.title }}</div>
        <img :src="course.thumbnail" alt="Course Thumbnail">

    </div>
</template>