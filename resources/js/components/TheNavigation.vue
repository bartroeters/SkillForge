<script setup lang="ts">
import { isLoggedIn, logout } from 'domains/auth';
import BrowseCoursesDropdown from './BrowseCoursesDropdown.vue';
import { goToOverviewPage } from '@/services/router';
import { COURSE_DOMAIN_NAME } from '@/domains/courses';
import AppName from './AppName.vue';

function redirectUponLogout() {
  goToOverviewPage(COURSE_DOMAIN_NAME);
};
</script>

<template>
  <div class="navigation-bar">
    <app-name>Skill Forge</app-name>

    <div class="navigation-links">
      <span v-if="isLoggedIn">
        <browse-courses-dropdown>
          <router-link :to="{ name: 'courses.overview' }">All Courses</router-link>
          <router-link :to="{ name: 'categories.overview' }">Disciplines</router-link>
        </browse-courses-dropdown>

        <a @click="logout(); redirectUponLogout()">Logout</a>
      </span>

      <span v-if="!isLoggedIn">
        <router-link :to="{ name: 'courses.overview' }">All Courses</router-link>
        <router-link :to="{ name: 'categories.overview' }">Disciplines</router-link>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </span>
    </div>
  </div>
</template>

<style scoped>
@import '../../css/the-navigation.css';
</style>
