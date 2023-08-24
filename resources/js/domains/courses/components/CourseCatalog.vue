<script setup lang="ts">
import { PropType, ref } from 'vue';
import Course from '../types';
import { getCategoryValue } from 'domains/categories';
import Category from 'domains/categories/types';
import { getVisibleSentences, toggleRows, setSentenceVisibility } from 'helpers/get-formatted-content';
import HoverMenu from 'components/HoverMenu.vue';

const props = defineProps({
  courses: { type: Array as PropType<Course[]> },
  categories: { type: Array as PropType<Category[]> }
});

const descriptionVisibilityFlags = ref<Record<number, boolean>>(setSentenceVisibility.value);
</script>

<template>
  <div class="course-grid">
    <div v-for="course in props.courses" :key="course.id" class="course-card">
      <div class="course-thumbnail">
        <img :src="course.thumbnail" :alt="course.title" />
      </div>

      <div class="course-details">
        <h3 class="course-title hover-menu-wrapper">
          <router-link :to="{name: 'courses.show', params: {id: course.id}}">
            {{ course.title }}
          </router-link>

          <hover-menu
            :text="`&rarr; Learn more about this course!`"
            :animation-delay=1500
            class="course-title-hover-menu"
            />
        </h3>

        <p class="course-description">
          {{ getVisibleSentences(course.description, course.id, 3) }}
        </p>

        <button v-if="course.description.length" @click="toggleRows(course.id)" class="toggle-content-button">
          {{ descriptionVisibilityFlags[course.id] ? '&uarr; Show less' : 'Read more &darr;' }}
        </button>

        <div class="course-categories">
          <span class="category-label">Disciplines: </span>
          
          <span v-for="(categoryId, index) in course.categoryIds" :key="index">
            <span class="hover-menu-wrapper">
              <router-link
                :to="{name: 'categories.show', params: {id: categoryId}}"
                class="course-category"
                >
                {{ getCategoryValue(categoryId)?.name }}
              </router-link>

              <hover-menu
                :text="`&rarr; View all courses within this discipline`"
                :animation-delay=1500
                :opacity=0.85
                class="category-link-hover-menu"
                />
            </span>
            <span v-if="index < course.categoryIds.length - 1">, </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../../../css/course-list.css';
</style>