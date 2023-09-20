<script setup lang="ts">
import { getLoggedInUser, isLoggedIn, me } from 'domains/auth';
import { getUserFullName } from '..';
import { courseStore } from 'domains/courses';
import { lessonStore } from 'domains/lessons';
import StudentCourses from '../components/StudentCourses.vue';
import TutorLessons from '../components/TutorLessons.vue';
import PageTitle from 'components/PageTitle.vue';
import { ref } from 'vue';
import { User } from '../types';

courseStore.actions.getAll();
lessonStore.actions.getAll();

me();

const user = ref(getLoggedInUser.value);

const welcomeMessage = `Welcome to your Dashboard, ${getUserFullName(user.value as User)}!`;
</script>

<template>
  <page-title v-if="user" :text="welcomeMessage" />

  <div class="dashboard-container">
    <student-courses />

    <tutor-lessons />
  </div>
</template>

<style scoped>
@import '../../../../css/user-dashboard.css';
</style>
