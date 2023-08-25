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

        <button v-if="category.description.length" @click="toggleRows(category.id)" class="toggle-content-button">
          {{ categoryDescriptionVisibilityFlags[category.id] ? '&uarr; Show less' : 'Read more &darr;' }}
        </button>




        <div class="category-courses">
          <span class="course-label">Disciplines: </span>
          
          <span v-for="(courseId, index) in category.courseIds" :key="index">
            <span class="hover-menu-wrapper">
              <router-link
                :to="{name: 'categories.show', params: {id: courseId}}"
                class="course-category"
                >
                {{ getCourseValue(courseId)?.title }}
              </router-link>

              <hover-menu
                :text="`&rarr; Learn more about this course!`"
                :animation-delay=1500
                :opacity=0.85
                class="course-link-hover-menu"
                />
            </span>
            <span v-if="index < category.courseIds.length - 1">, </span>
          </span>
        </div>



      </div>
    </div>
  </div>
</template>

<style>
@import '../../../../css/category-catalog.css';
</style>