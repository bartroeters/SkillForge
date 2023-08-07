<script setup lang="ts">
import { getLessonValue, lessonsByTutor } from '..';
</script>

<template>
  <h3>
    Lessons you provide as a tutor
  </h3>

  <div class="course-wrapper">
    <router-link
      :to="{ name: 'lessons.create' }"
      class="create-lesson-link"
      >
      Upload new lesson
    </router-link>

    <div v-for="(lesson, index) in lessonsByTutor" class="lesson-wrapper">
      <router-link
        :key="index"
        :to="{ name: 'lessons.show', params: { id: lesson.id } }"
        class="show-lesson-link"
        >
        {{ getLessonValue(lesson.id).title }} ({{ lesson.courseIds.join(', ') }})
      </router-link>

      <router-link
        :to="{name: 'lessons.edit', params: {id: lesson.id}}"
        class="edit-lesson-link">
        edit
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@import '../../../../css/user-dashboard.css';
</style>