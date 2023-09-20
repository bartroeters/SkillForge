<script setup lang="ts">
import { PropType, ref } from 'vue';
import type Course from '../types';
import { getCategoryValue } from 'domains/categories';
import type Category from 'domains/categories/types';
import { getVisibleSentences, toggleRows, setSentenceVisibility } from 'helpers/get-formatted-content';
import PageTitle from 'components/PageTitle.vue';
import HoverMenu from 'components/HoverMenu.vue';

const props = defineProps({
  courses: { type: Array as PropType<Course[]> },
  categories: { type: Array as PropType<Category[]> }
});

const courseDescriptionVisibilityFlags = ref<Record<number, boolean>>(setSentenceVisibility.value);
</script>

<template>
  <page-title text="Course Catalog" />

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

        <span class="request-course-info">
          <button v-if="course.description.length" @click="toggleRows(course.id)" class="toggle-content-button">
            {{ courseDescriptionVisibilityFlags[course.id] ? '&uarr; Show less' : 'Read more &darr;' }}
          </button>

          <router-link :to="{name: 'courses.show', params: {id: course.id}}" class="show-course-link">
            &rarr; Read all
          </router-link>
        </span>


        <div v-if="course.categoryIds && course.categoryIds.length > 0" class="course-categories">
          <span class="category-label">
            {{ course.categoryIds.length === 1
            ? 'More courses within the same discipline:'
            : 'More courses within the same disciplines:' }}
          </span>
          
          <span>
            <span v-for="(categoryId, index) in course.categoryIds" :key="index">
              <span class="hover-menu-wrapper">
                <router-link
                  :to="{name: 'categories.show', params: {id: categoryId}}"
                  class="course-category"
                  >
                  {{ getCategoryValue(categoryId)?.title }}
                </router-link>

                <hover-menu
                  :text="`&rarr; View all courses within this discipline`"
                  :animation-delay=1500
                  :opacity=0.92
                  class="category-link-hover-menu"
                  />
                </span>
              <span v-if="index < course.categoryIds.length - 1">, </span>
            </span>
          </span>
        </div>

        <div v-else>This course does not belong to any discipline.</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../../../css/course-catalog.css';
</style>