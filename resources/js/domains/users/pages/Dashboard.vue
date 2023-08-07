  <script setup lang="ts">
  import { getLoggedInUser, me } from 'domains/auth';
  import { getUserFullName } from '..';
  import { courseStore } from 'domains/courses';
  import { lessonStore } from 'domains/lessons';

  import StudentCourses from '../components/StudentCourses.vue';
  import TutorLessons from '../components/TutorLessons.vue';

  courseStore.actions.getAll();
  lessonStore.actions.getAll();

  me();
  </script>

  <template>
    <div class="dashboard-container" v-if="getLoggedInUser">
      <h1>
        Welcome to your Dashboard,
        {{ getUserFullName(getLoggedInUser) }}!
      </h1>

      <student-courses />

      <tutor-lessons />
    </div>
  </template>

  <style scoped>
  @import '../../../../css/user-dashboard.css';
  </style>
