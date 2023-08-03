<script setup lang="ts">
import { getLoggedInUser, me } from 'domains/auth';
import { getUserFullName, userCourses, getLessonValue, lessonsByTutor } from '..';
import { courseStore } from 'domains/courses';
import { lessonStore } from 'domains/lessons';
import HoverMenu from 'components/HoverMenu.vue';

import { showAllContent, toggleContent } from 'components/get-formatted-content';

courseStore.actions.getAll();
lessonStore.actions.getAll();

me();
</script>

<template>
  <div class="dashboard-container" v-if="getLoggedInUser">
    <h1>
      Welcome to your Dashboard, {{ getUserFullName(getLoggedInUser) }}!
    </h1>

    <div v-if="userCourses && userCourses.length > 0">
      <h3>
        Courses you are enrolled in as a student
      </h3>

      <div v-for="(course, index) in userCourses" :key="index" class="course-wrapper">
        <router-link :to="{ name: 'courses.dashboard' }" class="course-title-wrapper">
          <h4 class="course-title">
            {{ course.value?.title }}
          </h4>
          <hover-menu :text="`Go to ${course.value?.title} Dashboard`" class-name="hover-menu" />
        </router-link>

        <router-link
          v-for="(lessonId, index) in course.value?.lessonIds.slice(0, showAllContent[course.value?.id] ? undefined : 5)"
          :key="index"
          :to="{ name: 'lessons.show', params: { id: lessonId } }"
          class="show-lesson-link"
        >
          {{ getLessonValue(lessonId)?.title }}
        </router-link>

        <button @click="toggleContent(course.value?.id)" class="toggle-content-button">
          {{ showAllContent[course.value?.id] ? 'Show Less' : 'Show More' }}
        </button>
      </div>
    </div>

    <div v-if="lessonsByTutor.length > 0">
      <h3>
        Courses within which you provide lessons as a tutor
      </h3>

      <div v-for="(course, index) in userCourses" :key="index" class="course-wrapper">
        <h4 class="course-title">
          {{ course.value.title }}
        </h4>

        <router-link :to="{ name: 'lessons.create' }" class="create-lesson-link">
          Upload new lesson
        </router-link>

        <router-link
          v-for="(lessonId, index) in course.value.lessonIds"
          :key="index"
          :to="{ name: 'lessons.show', params: { id: lessonId } }"
          class="show-lesson-link"
        >
          {{ getLessonValue(lessonId)?.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  padding: 20px;
  background-color: #f5f5f5;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.course-wrapper {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
}

.course-title-wrapper {
  position: relative;
  cursor: pointer;
}

.course-title {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 18px;
  color: #007bff;
}

.lesson-link {
  margin-bottom: 3px;
  margin-left: 20px;
  font-size: 16px;
  color: #007bff;
}

.show-lesson-link,
.create-lesson-link {
  display: block;
  margin-top: 10px;
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  color: inherit;
}

.show-lesson-link:hover,
.create-lesson-link:hover {
  color: #0056b3;
  letter-spacing: 0.2px;
  font-weight: 600;
}

.hover-menu {
  display: none;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.course-title-wrapper:hover .hover-menu {
  display: block;
}

.toggle-content-button {
  display: block;
  margin-top: 10px;
  font-size: 16px;
  color: #007bff;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.toggle-content-button:hover {
  text-decoration: underline;
}
</style>
