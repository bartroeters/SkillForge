<script setup lang="ts">
import Course from 'domains/courses/types';
import { PropType, ref } from 'vue';
import Category from '../types';
import PageTitle from 'components/PageTitle.vue';
import HoverMenu from 'components/HoverMenu.vue';
import { getVisibleSentences, setSentenceVisibility, toggleRows } from 'helpers/get-formatted-content';
import { getCourseValue } from 'domains/courses';

const props = defineProps({
  courses: { type: Array as PropType<Course[]> },
  categories: { type: Array as PropType<Category[]> }
});

const categoryDescriptionVisibilityFlags = ref<Record<number, boolean>>(setSentenceVisibility.value);
</script>

<template>
  <page-title text="Category Catalog" />

  <div class="category-grid">
    <div v-for="category in props.categories" :key="category.id" class="category-card">
      <div class="category-thumbnail">
        <img :src="category.thumbnail" alt="category.title">
      </div>

      <div class="category-details">
        <h3 class="category-title hover-menu-wrapper">
          <router-link :to="{ name: 'categories.show', params: { id: category.id } }">
            {{ category.title }}
          </router-link>

          <hover-menu 
            :text="`&rarr; View all courses within this category`"
            :animation-delay=1500
            class="category-title-hover-menu"
          />
        </h3>

        <p class="category-description">
          {{ getVisibleSentences(category.description, category.id, 3) }}
        </p>

        <span class="request-category-info">
          <button v-if="category.description.length" @click="toggleRows(category.id)" class="toggle-content-button">
            {{ categoryDescriptionVisibilityFlags[category.id] ? '&uarr; Show less' : 'Read more &darr;' }}
          </button>

          <router-link :to="{name: 'categories.show', params: {id: category.id}}" class="show-category-link">
            &rarr; Read all
          </router-link>
        </span>

        <div v-if="category.courseIds && category.courseIds.length > 0" class="category-courses">
          <span class="course-label">Courses within this category: </span>
        
          <span>
            <span v-for="(courseId, index) in category.courseIds" :key="index">
              <span class="hover-menu-wrapper">
                <router-link
                  :to="{name: 'courses.show', params: {id: courseId}}"
                  class="category-course"
                  >
                  {{ getCourseValue(courseId)?.title }}
                </router-link>

                <hover-menu
                  :text="`&rarr; Learn more about this course!`"
                  :animation-delay=1500
                  :opacity=0.92
                  class="course-link-hover-menu"
                  />
                </span>
              <span v-if="index < category.courseIds.length - 1">, </span>
            </span>
          </span>
        </div>

        <div v-else>No courses within this category yet.</div>
      </div>
    </div>
  </div>
</template>

<style>
@import '../../../../css/category-catalog.css';
</style>