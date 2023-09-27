<script setup lang="ts">
import { ref, computed } from 'vue';
import PageTitle from 'components/PageTitle.vue';
import { getCurrentRouteId, getCurrentRouteName } from 'services/router';
import { courseStore } from '..';
import { getLessonValue, lessonStore } from 'domains/lessons';
import { announcementStore, getAnnouncementValues } from 'domains/announcements';
import { getVisibleItemIds, setForeignIdVisibility, toggleContent } from 'helpers/get-formatted-content';
import { formatDate } from 'helpers/date-time-formatter';

const courseId = computed(() => getCurrentRouteId());
const course = computed(() => courseStore.getters.byId(courseId.value));

courseStore.actions.getAll();
lessonStore.actions.getAll();
announcementStore.actions.getAll();

const lessonVisibilityFlags = ref<Record<number, boolean>>(setForeignIdVisibility.value);
</script>

<template>
  <page-title :text="`Course Dashboard: ` + course.value?.title"/>

  <h3>Lessons within this course</h3>

  <div v-if="course.value">
    <div class="lesson-list-wrapper">
    <router-link
        v-for="(lessonId, index) in getVisibleItemIds(course.value, course.value?.lessonIds, 3)"
        :key="index"
        :to="{ name: 'lessons.show', params: { id: lessonId }, query: { sourceRoute: getCurrentRouteName(), sourceCourseId: getCurrentRouteId() } }"
        class="show-lesson-link"
        >
        {{ getLessonValue(lessonId)?.title }}
      </router-link>

      <button  @click="toggleContent(undefined, course.value?.id)" class="toggle-content-button">
        {{ lessonVisibilityFlags[course.value?.id] ? 'Show less &uarr;' : 'Show more lessons &darr;' }}
      </button>
    </div>

    <h3>Announcements</h3>

    <div v-for="(announcement, index) in getAnnouncementValues(course.value?.id)" :key="index">
      <h4>{{ announcement.title }}</h4>
      <p>{{ formatDate(announcement.createdAt) }}</p>
      <p>{{ announcement.content }}</p>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-size: 20px;
}

.lesson-list-wrapper {
  margin-bottom: 7px;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #dddddd;
}

.show-lesson-link {
  display: block;
  margin-top: 10px;
  width: 355px;
  font-size: 16px;
  color: #007bff;
  text-decoration: none;
  color: inherit;
}

.show-lesson-link:hover {
  color: #0056b3;
  letter-spacing: 0.2px;
  font-weight: 600;
}

.toggle-content-button {
  display: block;
  margin-top: 10px;
  margin-bottom: 8px;
  font-size: 12.7px;
  color: #007bff;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.toggle-content-button:hover {
  text-decoration: underline;
}
</style>