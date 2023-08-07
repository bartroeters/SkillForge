<script setup lang="ts">
import { getLessonValue, userCourses } from '..';
import { showAllContent, toggleContent } from '../../../components/get-formatted-content';
import HoverMenu from 'components/HoverMenu.vue';
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

      <!-- try `getFormattedContent(course.value?.lessonIds, course.value?.id, 4)` -->

      <router-link
        v-for="(lessonId, index) in course.value?.lessonIds.slice(0, showAllContent[course.value?.id] ? undefined : 3)"
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