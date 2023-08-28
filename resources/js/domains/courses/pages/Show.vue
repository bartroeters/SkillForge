<script setup lang="ts">
import { getCurrentRouteId } from 'services/router';
import { courseStore } from '..';

const courseId = getCurrentRouteId();
const course = courseStore.getters.byId(courseId);

courseStore.actions.getAll();
</script>

<template>
  <div class="course-container">

    <div class="thumbnail">
      <img :src="course?.thumbnail" :alt="course?.title">

      <router-link :to="{name: 'courses.edit', params: {id: courseId}}">Enroll in course</router-link>
    </div>

    <div class="content-wrapper">
      <h2 class="course-title">{{ course?.title }}</h2>

      <div class="course-description">{{ course?.description }}</div>
    </div>

    
  </div>
</template>

<style scoped>
.course-container {
  display: flex;
  border: 1px solid #dddddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  padding: 20px;
}

.thumbnail {
  flex: 0 0 35%;
}

.thumbnail img {
  margin-top: 33px;
  max-width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  border-radius: 10%;
}

.content-wrapper {
  margin-left: 20px;
}

.course-title {
  font-size: 32px;
  color: #333;
}

.course-description {
  font-size: 17px;
  line-height: 1.5;
  color: #555;
}
</style>

