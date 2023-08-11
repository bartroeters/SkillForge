<script setup lang="ts">
import { ref } from 'vue';
import { getLessonValue, userCourses } from '..';
import { showAllContent, toggleContent, getVisibleItemIds, getVisibleItems } from 'helpers/get-formatted-content';
import HoverMenu from 'components/HoverMenu.vue';
import Course from 'domains/courses/types';
import { courseStore } from 'domains/courses';

const courses = courseStore.getters.all;

courseStore.actions.getAll();

// Define a ref to hold the flag for visible courses
const showVisibleCourses = ref(true);

// Define a function to toggle the visibility of courses
function toggleCoursesVisibility() {
  toggleContent('visibleCourses');
}
</script>

<template>
    <h3>
      Courses you are enrolled in as a student
    </h3>

    <!-- <div v-for="(course, index) in getVisibleItems(courses, 3)" :key="index">
      {{ course.title }}
    </div>

    <div v-for="(course, index) in courses" :key="index">
      {{ course.title }}
    </div> -->

      <!-- Toggle button using the toggleCoursesVisibility function -->
    <button @click="toggleCoursesVisibility" class="toggle-content-button">
      {{ showAllContent['visibleCourses'] ? 'Show Less &uarr;' : 'Show More Lessons &darr;' }}
    </button>

    <!-- Render the appropriate div section based on the showAllContent flag -->
    <div v-if="showAllContent['visibleCourses']">
      <div v-for="(course, index) in getVisibleItems(courses, 3)" :key="index">
        {{ course.title }}
      </div>
    </div>
    
    <div v-else>
      <div v-for="(course, index) in courses" :key="index">
        {{ course.title }}
      </div>
    </div>

    <div v-for="(course, index) in userCourses" :key="index" class="course-wrapper">
      <router-link
        :to="{ name: 'courses.dashboard' }"
        class="course-title-wrapper"
        style="text-decoration: none"
        >
        <h4>
          {{ course.value?.title }}
        </h4>

        <hover-menu :text="`Go to ${course.value?.title} Dashboard`" class-name="hover-menu" />
      </router-link>

      <router-link
        v-for="(lessonId, index) in getVisibleItemIds(course.value?.lessonIds, course.value?.id, 3)"
        :key="index"
        :to="{ name: 'lessons.show', params: { id: lessonId } }"
        class="show-lesson-link"
        >
        {{ getLessonValue(lessonId)?.title }}
      </router-link>

      <button @click="toggleContent(course.value?.id)" class="toggle-content-button">
        {{ showAllContent[course.value?.id] ? 'Show Less &uarr;' : 'Show More Lessons &darr;' }}
      </button>
    </div>
</template>

<style scoped>
@import '../../../../css/user-dashboard.css';
</style>