<script setup lang="ts">
import { getCurrentRouteId, goToRoute } from 'services/router';
import { courseStore } from '..';
import EnrollForm from '../components/EnrollForm.vue';

const courseId = getCurrentRouteId();
const course =  courseStore.getters.byId(courseId);


</script>

<template>
  <enroll-form :course="course"/>
</template>