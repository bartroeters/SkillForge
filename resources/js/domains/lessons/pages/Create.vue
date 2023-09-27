<script setup lang="ts">
import LessonForm from '../components/LessonForm.vue';
import Lesson from '../types';
import { lessonStore } from '..';
import { goToRoute } from 'services/router';

const createLesson = async (lessonData: Lesson) => {
    await lessonStore.actions.create(lessonData);
    goToRoute('user-dashboard.overview');
};
</script>

<template>
    <lesson-form @submitLesson="createLesson" />
</template>
