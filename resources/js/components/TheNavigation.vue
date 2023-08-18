<script setup lang="ts">
import { isLoggedIn, logout } from 'domains/auth';
import { goToOverviewPage } from 'services/router';
import { COURSE_DOMAIN_NAME } from 'domains/courses';
import Dropdown from './Dropdown.vue';
import TheAppName from './TheAppName.vue';

function redirectUponLogout() {
  goToOverviewPage(COURSE_DOMAIN_NAME);
};
</script>

<template>
  <div class="navigation-bar">
    <the-app-name>Skill Forge</the-app-name>

    <div class="navigation-links">
      <span v-if="isLoggedIn">
        <dropdown :text="'Browse Courses'" class-name="dropdown-menu" :closeWithDelay="true">
          <router-link :to="{ name: 'courses.overview' }">All Courses</router-link>
          <router-link :to="{ name: 'categories.overview' }">Disciplines</router-link>
        </dropdown>

        <a @click="logout(); redirectUponLogout()">Logout</a>
      </span>

      <span v-if="!isLoggedIn" class="auth-links">
        <router-link :to="{ name: 'courses.overview' }">All Courses</router-link>
        <router-link :to="{ name: 'categories.overview' }">Disciplines</router-link>
        <dropdown :text="'Account'" class-name="dropdown-menu" :closeWithDelay="true">
          <router-link :to="{ name: 'login' }">Login</router-link>
          <router-link :to="{ name: 'register' }">Register</router-link>
        </dropdown>
      </span>
    </div>
  </div>
</template>

<style>
  @import '../../css/the-navigation.css';
</style>
