<script setup lang="ts">
import { PropType } from 'vue';
import { getLoggedInUser } from 'domains/auth';
import { getUserFullName, userStore } from '..';
import { Course } from '@/domains/courses/types';
import Category from '@/domains/categories/types';
import { courseStore } from '@/domains/courses';

// const { courses, categories } = defineProps({
//   courses: {type: Array as PropType<Course[]>},
//   categories: { type: Array as PropType<Category[]> }
// });

const props = defineProps({
  courses: {type: Array as PropType<Course[]>}
})

userStore.actions.getAll;
courseStore.actions.getAll;
</script>

<template>
  <div class="dashboard-container" v-if="getLoggedInUser">
    <h1>Welcome to your Dashboard, {{ getLoggedInUser?.firstName }}!</h1>

    <div v-for="course in props.courses">d</div>

    <!-- <div>
      <h2>Your Courses</h2>
      <div class="courses-container">
        <div v-for="(courseId, index) in getLoggedInUser.courseIds" :key="index" class="course-card">
          <div>{{ courseId }}</div> -->
          <!-- <router-link :to="{ name: 'courses.dashboard', params: { courseId: courseId } }"> -->
            <!-- <div class="course-title">{{ course.title }}</div>
            <div class="course-description">{{ course.description }}</div> -->
          <!-- </router-link> -->
        <!-- </div>
      </div>
    </div> -->

    <!-- <div v-if="user.role === 'teacher'">
      <h2>Your Lessons</h2>
      <div v-for="course in user.courses" :key="course.id">
        <h3>{{ course.title }}</h3>
        <div class="lessons-container">
          <div v-for="lesson in course.lessons" :key="lesson.id" class="lesson-card">
            <router-link :to="{ name: 'lessons.edit', params: { lessonId: lesson.id } }">
              {{ lesson.title }}
            </router-link>
          </div>
        </div>
      </div>
      <router-link :to="{ name: 'lessons.create' }">Add Lesson</router-link>
    </div> -->
  </div>
</template>

<style scoped>
/* Styles for the dashboard page */
.dashboard-container {
    margin-top: 20px;
}

.courses-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 20px;
    margin-top: 20px;
}

.course-card {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s;
}

.course-card:hover {
    transform: scale(1.05);
}

.course-title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
}

.course-description {
    font-size: 14px;
    color: #666;
    margin-top: 5px;
}

/* Styles for the logout button */
.logout-button {
    background-color: #f44336;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.logout-button:hover {
    background-color: #d32f2f;
}
</style>