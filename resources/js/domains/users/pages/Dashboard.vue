<script setup lang="ts">
import { PropType, onMounted, ref } from 'vue';
import { getLoggedInUser, loggedInUser } from 'domains/auth';
import { userStore, getUserFullName } from '..';
import { Course } from 'domains/courses/types';
import Category from 'domains/categories/types';
import { courseStore } from 'domains/courses';

const courses = courseStore.getters.all;
const users = userStore.getters.all;


const userId = ref(getLoggedInUser.value);
console.log(userId);


userStore.actions.getAll();
courseStore.actions.getAll();
</script>

<template>
  <div class="dashboard-container" v-if="getLoggedInUser">
    <h1>Welcome to your Dashboard, {{ getUserFullName(getLoggedInUser.id) }}!</h1>


    <div v-for="(courseId, index) in user.courseIds" :key="index">
      {{ courseId }}
    </div>
  </div>
</template>
