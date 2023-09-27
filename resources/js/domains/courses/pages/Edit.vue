<script setup lang="ts">
import { getCurrentRouteId, goToRoute } from 'services/router';
import { courseStore } from '..';
import EnrollCourseForm from '../components/EnrollCourseForm.vue';
import Course from '../types';
import { isLoggedIn } from 'domains/auth';

const courseId = getCurrentRouteId();
const course =  courseStore.getters.byId(courseId);

const editCourse = async (userToEnroll: Course) => {
  await courseStore.actions.update(courseId, userToEnroll);
  goToRoute('user-dashboard.overview');
}
</script>

<template>
  <enroll-course-form v-if="isLoggedIn" :course="course" @enrollCourse="editCourse"/>
</template>