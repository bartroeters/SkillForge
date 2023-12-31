<script setup lang="ts">
import { computed, ref } from 'vue';
import { userCourses } from '..';
import { toggleContent, setForeignIdVisibility, getVisibleItemIds } from 'helpers/get-formatted-content';
import HoverMenu from 'components/HoverMenu.vue';
import { courseStore, getCourseValue } from 'domains/courses';
import { getLessonValue, lessonStore } from 'domains/lessons';
import { categoryStore } from 'domains/categories';
import { formatDate } from 'helpers/date-time-formatter';
import { getCurrentRouteName } from 'services/router';

const lessonVisibilityFlags = ref<Record<number, boolean>>(setForeignIdVisibility.value);

categoryStore.actions.getAll();
courseStore.actions.getAll();
</script>

<template>
  <h3>Courses you are enrolled in as a student</h3>

  <div v-for="(course, index) in userCourses" :key="index" class="course-wrapper">
    <div v-if="course">
      <router-link :to="{ name: 'course-dashboard.show', params: {id: course.id} }" class="course-title">
        <div class="hover-menu-wrapper">
          <h4>{{ course.title }}</h4>
          <hover-menu :text="`Go to ${course.title} Dashboard`" />
        </div>
      </router-link>
        
      <router-link
        v-for="(lessonId, index) in getVisibleItemIds(course, course.lessonIds, 3)"
        :key="index"
        :to="{ name: 'lessons.show', params: { id: lessonId }, query: { sourceRoute: getCurrentRouteName() } }"
        class="show-lesson-link"
        >
        {{ lessonId }}
        {{ getLessonValue(lessonId)?.title }}
      </router-link>

      <button  @click="toggleContent(undefined, course.id)" class="toggle-content-button">
        {{ lessonVisibilityFlags[course.id] ? 'Show less &uarr;' : 'Show more lessons &darr;' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '../../../../css/user-dashboard.css';
</style>