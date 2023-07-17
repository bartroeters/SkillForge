<script setup lang="ts">
import { isLoggedIn, logout } from 'domains/auth';
import { ref, watchEffect } from 'vue';

const isDropdownOpen = ref(false);
let timeoutId: number | null = null;
let isMouseOverDropdown = false;

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function closeDropdownWithDelay() {
  timeoutId = window.setTimeout(() => {
    if (!isMouseOverDropdown) {
      isDropdownOpen.value = false;
      timeoutId = null;
    }
  }, 1800);
}

watchEffect(() => {
  if (!isDropdownOpen.value && timeoutId !== null) {
    window.clearTimeout(timeoutId);
    timeoutId = null;
  }
});
</script>

<template>
  <div class="navigation-bar">
    <router-link
      class="app-title"
      :to="isLoggedIn ? { name: 'users.dashboard' } : { name: 'courses.overview' }"
    >
      Skill Forge
    </router-link>

    <div class="navigation-links">
      <span v-if="!isLoggedIn">
        <router-link :to="{ name: 'courses.overview' }">All Courses</router-link>
        <router-link :to="{ name: 'categories.overview' }">Disciplines</router-link>
        <router-link :to="{ name: 'login' }">Login</router-link>
      </span>

      <span v-if="isLoggedIn">
        <span
          class="dropdown"
          :class="{ open: isDropdownOpen }"
          @mouseenter="isMouseOverDropdown = true"
          @mouseleave="isMouseOverDropdown = false"
        >
          <a class="dropdown-toggle" role="button" @click="toggleDropdown">
            My Account
          </a>

          <ul
            v-if="isDropdownOpen"
            class="dropdown-menu"
            @mouseleave="closeDropdownWithDelay"
          >
            <li>
              <router-link :to="{ name: 'courses.overview' }">All Courses</router-link>
            </li>

            <li>
              <router-link :to="{ name: 'categories.overview' }">Disciplines</router-link>
            </li>
          </ul>
        </span>

        <a @click="logout">Logout</a>
      </span>
    </div>
  </div>
</template>

<style scoped>
@import '../../css/the-navigation.css';
</style>
