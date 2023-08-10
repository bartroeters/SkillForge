<script setup lang="ts">
import { getLessonValue, userCourses } from '..';
import { showAllContent, toggleContent, getFormattedItemIds } from 'helpers/get-formatted-content';
import HoverMenu from 'components/HoverMenu.vue';
import Course from 'domains/courses/types';
</script>

<template>
    <h3>
      Courses you are enrolled in as a student
    </h3>

    <div v-for="(course, index) in userCourses" :key="index" class="course-wrapper">
      <router-link
        :to="{ name: 'courses.dashboard' }"
        class="course-title-wrapper"
        style="text-decoration: none"
        >
        <h4>
          {{ course.value?.title }}
        </h4>

        <hover-menu
          :text="`Go to ${course.value?.title} Dashboard`"
          class-name="hover-menu"
          />
        </router-link>

        <router-link
          v-for="(lessonId, index) in getFormattedItemIds(
            course.value?.lessonIds,
            id => id,
            3,
            course.value?.id
            )"
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