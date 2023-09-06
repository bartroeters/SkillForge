<script setup lang="ts">
import { getVisibleItems, initializeVisibilityFlags, initializeToggle, toggleContent } from 'helpers/get-formatted-content';
import { lessonsByTutor } from '..';
import { getLessonValue, getLessonValues } from 'domains/lessons';
import HoverMenu from 'components/HoverMenu.vue';

initializeToggle(['lessons']);
const visibilityFlags = initializeVisibilityFlags(['lessons']);
</script>

<template>
  <h3>Lessons you provide as a tutor</h3>

  <div class="course-wrapper">
    <router-link :to="{ name: 'lessons.create' }" class="create-lesson-link">
      Upload new lesson
    </router-link>

    <div v-for="(lesson, index) in getVisibleItems('lessons', lessonsByTutor, 5)" class="lesson-wrapper">
      <div class="hover-menu-wrapper">
        <router-link :key="index" :to="{ name: 'lessons.show', params: { id: lesson.id } }" class="show-lesson-link">
          {{ getLessonValue(lesson.id).title }}
        </router-link>

        <hover-menu
          :text="`This lesson is taught in these courses: ${getLessonValues(lesson.courseIds).map(lesson => lesson.title).join(', ')}`"
          :animation-delay=1500
          :opacity=0.8
          />
      </div>

      <router-link :to="{name: 'lessons.edit', params: {id: lesson.id}}" class="edit-lesson-link">
        edit
      </router-link>
    </div>

    <button @click="toggleContent('lessons')" class="toggle-content-button">
      {{ visibilityFlags.lessons.value ?  'Show less &uarr;' : 'Show more lessons &darr;'  }}
    </button>
  </div>
</template>

<style scoped>
@import '../../../../css/user-dashboard.css';
</style>