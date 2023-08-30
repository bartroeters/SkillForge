<script setup lang="ts">
import { computed } from 'vue';
import { getCurrentRouteId, getCurrentRouteName } from 'services/router';
import { courseStore, isUserEnrolledInCourse } from '..';
import { isLoggedIn } from 'domains/auth';
import PageTitle from 'components/PageTitle.vue';

const courseId = getCurrentRouteId();
const course = courseStore.getters.byId(courseId);

courseStore.actions.getAll();

const courseTitle = computed(() => `${course.value?.title}`);
</script>

<template>
  <page-title :text="courseTitle"/>

  <div class="course-container">
    <div class="thumbnail">
      <img :src="course?.thumbnail" :alt="course?.title">

      <span class="enroll-course-links">
        <router-link
        :to="isLoggedIn
          ? { name: 'courses.edit', params: { id: courseId } }
          : { name: 'enroll', params: { id: courseId }, query: { sourceRoute: getCurrentRouteName() } }"
          >
          <span class="hidden-arrow enroll-arrow">&rarr;</span>
          Enroll in course
        </router-link>

        <router-link
          v-if="isUserEnrolledInCourse(courseId)"
          :to="{name: 'courses.dashboard'}"
          >
          <span class="hidden-arrow">&rarr;</span>
          Write a review
        </router-link>
      </span>
    </div>

    <p class="course-description">{{ course?.description }}</p>
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
  margin-bottom: 25px;
  max-width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  border-radius: 10%;
}

.enroll-course-links > a {
  display: flex;
  color: #007bff;
  text-decoration: none;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  letter-spacing: .1px;
}

.enroll-course-links:hover {
  color: #0056b3;
  letter-spacing: .2px;
}

.hidden-arrow {
  display: none;
}

.enroll-course-links:hover .hidden-arrow {
  display: inline;
  margin-right: 5px;
}

.course-description {
  font-size: 17px;
  margin: 20px;
  line-height: 1.5;
  color: #555;
}
</style>