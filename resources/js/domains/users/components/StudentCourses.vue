<script setup lang="ts">
import { computed, ref } from 'vue';
import { getLessonValue, userCourses } from '..';
import { toggleContent, setItemVisibility, setGroupVisibility, getVisibleItems, getVisibleItemIds } from 'helpers/get-formatted-content';
import HoverMenu from 'components/HoverMenu.vue';
import Course from 'domains/courses/types';
import { courseStore } from 'domains/courses';

const courses = courseStore.getters.all;

const courseVisibility = ref(setItemVisibility.value);
const lessonVisibility = ref<Record<number, boolean>>(setGroupVisibility.value);

courseStore.actions.getAll();
</script>


<template>
  <div>
    <div v-for="(course, index) in getVisibleItems(courses, 3)" :key="index">
      ({{ index }})
      {{ course.title }}
    </div>

    <button @click="toggleContent()">
      {{ courseVisibility ? 'Hide All Courses' : 'Show All Courses' }}
    </button>

    <div v-for="(course, index) in userCourses" :key="index">
      <div v-for="(lessonId, index) in getVisibleItemIds(course.value?.lessonIds, course.value?.id, 3)" :key="index">
        ({{ index }})
        {{ getLessonValue(lessonId)?.title }}
      </div>

      <button @click="toggleContent(course.value?.id)">
        {{ lessonVisibility[course.value?.id] ? 'Show Less &uarr;' : 'Show More Lessons &darr;' }}
      </button>
    </div>
  </div>
</template>

<!-- <template>
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
</style> -->