<script setup lang="ts">
import { getCurrentRouteId, goToRoute } from 'services/router';
import { courseStore } from '..';
import EnrollCourseForm from '../components/EnrollCourseForm.vue';
import { isLoggedIn } from 'domains/auth';

const courseId = getCurrentRouteId();
const course =  courseStore.getters.byId(courseId);

const enrollUser = async () => {
  await courseStore.actions.enrollUser(courseId, course.value);
  goToRoute('user-dashboard.overview');
}
</script>

<template>
  <enroll-course-form v-if="isLoggedIn" :course="course" @enrollUser="enrollUser"/>
</template>