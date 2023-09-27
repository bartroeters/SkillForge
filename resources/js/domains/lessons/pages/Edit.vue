<script setup lang="ts">
import LessonForm from '../components/LessonForm.vue';
import Lesson from '../types';
import { lessonStore } from '..';
import { getCurrentRouteId, goToRoute } from 'services/router';

const lessonId = getCurrentRouteId();
const lesson = lessonStore.getters.byId(lessonId);

const editLesson = async (lessonData: Lesson) => {
    await lessonStore.actions.update(lessonId, lessonData);
    goToRoute('user-dashboard.overview');
};
</script>

<template>
    <lesson-form :lesson="lesson" @submitLesson="editLesson" />
</template>
