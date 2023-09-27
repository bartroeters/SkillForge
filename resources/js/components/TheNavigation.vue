<script setup lang="ts">
import { isLoggedIn, logout } from 'domains/auth';
import { goToOverviewPage } from 'services/router';
import { COURSE_DOMAIN_NAME, courseStore } from 'domains/courses';
import Dropdown from './Dropdown.vue';
import TheAppTitle from './TheAppTitle.vue';
import { userCourses } from 'domains/users';

courseStore.actions.getAll();

function redirectUponLogout() {
  goToOverviewPage(COURSE_DOMAIN_NAME);
};
</script>

<template>
  <div class="navigation-bar">
    <the-app-title>Skill Forge</the-app-title>

    <div class="navigation-links">
      <span v-if="isLoggedIn" style="display: flex;">
        <dropdown :text="'Your courses'" class-name="dropdown-menu" :closeWithDelay="true">
          <span v-for="(course, index) in userCourses" :key="index" style="display: flex; flex-direction: column;">
            <router-link v-if="course" :to="{name: 'course-dashboard.show', params: {id: course.id}}">{{ course?.title }}</router-link>
          </span>
        </dropdown>

        <dropdown :text="'More Courses'" class-name="dropdown-menu" :closeWithDelay="true">
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
