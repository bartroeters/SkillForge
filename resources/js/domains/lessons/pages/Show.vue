<script setup lang="ts">
import { ref } from'vue';
import { getCurrentRouteId } from 'services/router';
import { lessonStore } from '..';
import { getUserFullName, userStore } from 'domains/users';
import PageTitle from 'components/PageTitle.vue';

const lessonId = getCurrentRouteId();
const lesson = lessonStore.getters.byId(lessonId);

userStore.actions.getAll();
lessonStore.actions.getAll();
</script>

<template>
  <page-title :text="`Lesson: ` + lesson?.title"/>

  <div v-if="lesson" class="lesson-container">
    <div class="lesson-info">
      <h3>About {{ lesson.title }}</h3>
      <p class="lesson-tutor">This lesson is provided by
        <span>{{ getUserFullName(lesson.tutorId) }}</span>
      </p>
      <p>{{lesson.description}}</p>
    </div>

    <div class="video-content">
      <h3>gjdhgf</h3>
      <img :src="lesson.videoContent" :alt="lesson.title" class="video-image">
      <p>{{ lesson.textContent }}</p>
    </div>
  </div>
</template>

<style scoped>
.lesson-container {
  display: flex;
  flex-direction: column;
}

.lesson-info {
  display: flex;
  flex-direction: column;
}

.lesson-tutor {
  text-align: right;
  margin: -12px 0 -8px 0;
  font-style: italic;
}

.lesson-tutor > span {
  font-weight: 600;
}

.video-content {
  display: flex;
  flex-direction: column;
}

.video-image {
  max-width: 50%;
  height: auto;
  margin-bottom: 20px;
}
</style>