<script setup lang="ts">
import { ref, computed} from'vue';
import { getCurrentRouteId } from 'services/router';
import { goToDashBoardLink, lessonStore } from '..';
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

const redirectedFromUserDashboard = computed(() => useRoute().query.sourceRoute === 'users.dashboard');
const redirectedFromCourseDashboard = computed(() => useRoute().query.sourceRoute === 'courses.dashboard');
</script>

<template>
  <page-title :text="`Lesson: ` + lesson?.title"/>

  <span v-if="redirectedFromUserDashboard || redirectedFromCourseDashboard" class="return-to-previous-page">
    <router-link :to="goToDashBoardLink" class="back-to-dashboard">
      <span class="hidden-arrow">&larr;</span>
      Go back to {{ redirectedFromUserDashboard ? 'User' : 'Course' }} Dashboard
    </router-link>
  </span>

  <span v-else class="return-to-previous-page">
    <router-link :to="{name: 'users.dashboard'}" class="back-to-user-dashboard">
      <span class="hidden-arrow">&larr;</span>
      View your dashboard
    </router-link>

    <router-link :to="{name: 'courses.dashboard'}" class="back-to-course-dashboard">
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
.return-to-previous-page {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.return-to-previous-page a {
  text-decoration: none;
  color: #409bfc;
}

.back-to-dashboard:hover,
.back-to-user-dashboard:hover,
.back-to-course-dashboard:hover {
  display: inline;
  letter-spacing: .2px;
  color: #0056b3;
}

.hidden-arrow {
  display: none;
}

.back-to-dashboard:hover .hidden-arrow,
.back-to-user-dashboard:hover .hidden-arrow,
.back-to-course-dashboard:hover .hidden-arrow {
  display: inline;
  margin-right: 3px;
}

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

.paragraph {
  font-size: 102%;
  line-height: 127%;
  letter-spacing: .2px;
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

.note-title {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  font-size: 145%;
  letter-spacing: .8px;
}
</style>