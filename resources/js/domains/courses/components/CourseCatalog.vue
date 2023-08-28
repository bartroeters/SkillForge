<script setup lang="ts">
import { PropType, ref } from 'vue';
import type Course from '../types';
import { getCategoryValue } from 'domains/categories';
import type Category from 'domains/categories/types';
import { getVisibleSentences, toggleRows, setSentenceVisibility } from 'helpers/get-formatted-content';
import PageTitle from 'components/PageTitle.vue';
import HoverMenu from 'components/HoverMenu.vue';
import Catalog from 'components/Catalog.vue';

const props = defineProps({
  courses: { type: Array as PropType<Course[]> },
  categories: { type: Array as PropType<Category[]> }
});

const courseDescriptionVisibilityFlags = ref<Record<number, boolean>>(setSentenceVisibility.value);
</script>

<template>
  <page-title text="Course Catalog" />

  <catalog
    :items="courses"
    :associatedItems="categories"
    itemType="courses"
    associatedItemType="categories"
    :visibilityFlags="courseDescriptionVisibilityFlags"
    hoverMenuText="&rarr; Learn more about this course!"
    :animationDelay=1500
    :hoverMenuOpacity=0.92
  />
</template>

<style scoped>
@import '../../../../css/course-catalog.css';
</style>