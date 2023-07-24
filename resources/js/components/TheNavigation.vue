<script setup lang="ts">
import { isLoggedIn, logout } from 'domains/auth';
import { goToOverviewPage } from 'services/router';
import { COURSE_DOMAIN_NAME } from 'domains/courses';
import Dropdown from './Dropdown.vue';
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
        <dropdown :text="'Browse Courses'" class-name="dropdown-menu" :withDelay="true">
          <router-link :to="{ name: 'courses.overview' }">All Courses</router-link>
          <router-link :to="{ name: 'categories.overview' }">Disciplines</router-link>
        </dropdown>

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

<style>
  @import '../../css/the-navigation.css';
</style>
