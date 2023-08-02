<script setup lang="ts">
import { getLoggedInUser, me } from 'domains/auth';
import { getUserFullName, userCourses, getLessonValue, lessonsByTutor, getCourseTitle } from '..';
import { courseStore } from 'domains/courses';
import { lessonStore } from 'domains/lessons';

courseStore.actions.getAll();
lessonStore.actions.getAll();

me();
</script>

<template>
  <div class="dashboard-container" v-if="getLoggedInUser">
    <h1>
      Welcome to your Dashboard, {{ getUserFullName(getLoggedInUser) }}!
    </h1>

    <span v-if="userCourses && userCourses.length > 0">
      <h3>
        Courses you are enrolled in as a student
      </h3>

      <div v-for="(course, index) in userCourses" :key="index">
        <h4>Course: {{ course.value?.title }}</h4>

        <div v-for="(lessonId, index) in course.value?.lessonIds" :key="index">
          {{ getLessonValue(lessonId)?.title }}
        </div>
      </div>
    </span>

    <span v-if="lessonsByTutor.length > 0">
      <h3>
        Courses within you provide lessons as a tutor
      </h3>

      <div v-for="(course, index) in userCourses" :key="index">
        <div v-for="(lesson, index) in lessonsByTutor" :key="index">
            {{ lesson.title }} in {{ lesson.courseIds }}
        </div>
      </div>
    </span>
  </div>
</template>
