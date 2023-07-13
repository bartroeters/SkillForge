<script setup lang="ts">
import { PropType } from 'vue';
import Course from '../types';

const props = defineProps({
    courses: { type: Array as PropType<Course[]> }
});

</script>

<template>
    <div>resources\js\domains\courses\components\CourseList.Vue</div>

    <div v-for="(course, index) in props.courses" :key="index">
        {{ course.title }}
    </div>
</template>