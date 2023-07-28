<script setup lang="ts">
import { getLoggedInUser, me } from 'domains/auth';
import { getUserFullName, getCourseTitle } from '..';
import { courseStore } from 'domains/courses';

courseStore.actions.getAll();

me();
</script>

<template>
  <div class="dashboard-container" v-if="getLoggedInUser">
    <h1>Welcome to your Dashboard, {{ getUserFullName(getLoggedInUser) }}!</h1>

    <h6>Your courses</h6>
    <div v-for="(courseId, index) in getLoggedInUser.courseIds" :key="index">
      {{ getCourseTitle(courseId) }}
    </div>

    <h6></h6>
    <div v-for="lessons in getLoggedInUsers.lessons">

    </div>
  </div>
</template>
