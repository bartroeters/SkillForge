<script setup lang="ts">
import { PropType, ref } from 'vue';
import Course from '../types';
import { getCategoryValue } from 'domains/categories';
import Category from 'domains/categories/types';
import { getVisibleRows, toggleRows, setRowVisibility } from 'helpers/get-formatted-content';

const props = defineProps({
  courses: { type: Array as PropType<Course[]> },
  categories: { type: Array as PropType<Category[]> }
});

const courseDescriptionVisibility = ref<Record<number, boolean>>(setRowVisibility.value);
</script>

<template>
  <div class="course-grid">
    <div v-for="(course, index) in props.courses" :key="index" class="course-card">
      <div class="course-thumbnail">
        <img :src="course.thumbnail" :alt="course.title" />
      </div>

      <div class="course-details">
        <h3 class="course-title">{{ course.title }}</h3>

        <p class="course-description">{{ getVisibleRows(course.description, course.id, 5) }}</p>

        <button v-if="course.description.length" @click="toggleRows(course.id)">
          {{ courseDescriptionVisibility[course.id] ? '&uarr; Show less' : 'Show more &darr;' }}
        </button>

        <div v-for="(categoryId, index) in course.categoryIds" :key="index" class="course-category">
          Category: {{ getCategoryValue(categoryId)?.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.course-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.course-thumbnail img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.course-title {
  font-size: 18px;
  margin-bottom: 5px;
}

.course-description {
  font-size: 14px;
  margin-bottom: 10px;
}

.course-category {
  font-size: 12px;
  color: #007bff;
  margin-top: auto;
}
</style>
