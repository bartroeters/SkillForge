<script setup lang="ts">
import { ref, computed} from'vue';
import { getCurrentRouteId } from 'services/router';
import { lessonStore, goToDashBoardLink } from '..';
import { getUserFullName, userStore } from 'domains/users';
import PageTitle from 'components/PageTitle.vue';
import { useRoute } from 'vue-router';
import { formatDate } from 'helpers/date-time-formatter';
import { getNoteValue, noteStore } from 'domains/notes';
import AddNoteForm from '../components/AddNoteForm.vue';

const lessonId = getCurrentRouteId();
const lesson = lessonStore.getters.byId(lessonId);

noteStore.actions.getAll();
userStore.actions.getAll();
lessonStore.actions.getAll();

const redirectedFromUserDashboard = computed(() => useRoute().query.sourceRoute === 'user-dashboard.overview');
const redirectedFromCourseDashboard = computed(() => useRoute().query.sourceRoute === 'course-dashboard.show');
</script>

<template>  
  <page-title :text="`Lesson: ` + lesson?.title"/>

  <span v-if="redirectedFromUserDashboard || redirectedFromCourseDashboard" class="redirect-to-dashboard">
    <router-link :to="goToDashBoardLink" class="back-to-dashboard">
      <span class="hidden-arrow">&larr;</span>
      Go back to {{ redirectedFromUserDashboard ? 'User' : 'Course' }} Dashboard
    </router-link>
  </span>

  <span v-else class="redirect-to-dashboard">
    <router-link :to="{name: 'user-dashboard.overview'}" class="redirect-to-user-dashboard">
      <span class="hidden-arrow">&larr;</span>
      View your dashboard
    </router-link>

    <router-link :to="{name: 'course-dashboard.show', params: {id: 2}}" class="redirect-to-course-dashboard">
      <span class="hidden-arrow">&larr;</span>
      View course dashboard
    </router-link>
  </span>

  <div v-if="lesson" class="lesson-container">
    <div class="lesson-info">
      <h3>About {{ lesson.title }}</h3>
      <p class="lesson-tutor">This lesson is provided by
        <span>{{ getUserFullName(lesson.tutorId) }}</span>
      </p>
      <p class="paragraph">{{lesson.description}}</p>
    </div>

    <div class="video-content">
      <h3>Study material</h3>
      <img :src="lesson.videoContent" :alt="lesson.title" class="video-image">
      <p class="paragraph">{{ lesson.textContent }}</p>
    </div>
  </div>

  <add-note-form />

  <h4 class="note-title">Notes</h4>

  <p v-for="(note, index) in getNoteValue(lesson?.id)" :key="index" class="note">
    {{ note.content }} ({{ formatDate(note.createdAt) }})
  </p>
</template>

<style scoped>
@import '../../../../css/show-lesson.css';
</style>