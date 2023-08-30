<script setup lang="ts">
import { getLoggedInUser, loggedInUser, me } from 'domains/auth';
import { getUserFullName } from '..';
import { courseStore } from 'domains/courses';
import { lessonStore } from 'domains/lessons';
import StudentCourses from '../components/StudentCourses.vue';
import TutorLessons from '../components/TutorLessons.vue';
import PageTitle from 'components/PageTitle.vue';

courseStore.actions.getAll();
lessonStore.actions.getAll();

me();

const user = getLoggedInUser.value;
const welcomeMessage = user ? `Welcome to your Dashboard, ${getUserFullName(user)}!` : '';
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
