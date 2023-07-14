<script setup lang="ts">
import { isLoggedIn, logout } from 'domains/auth';

</script>

<template>
  <div class="app-container">
    <div class="navigation-container">
      <span class="app-title">
        Skill Forge
      </span>

      <router-link v-if="!isLoggedIn" :to="{name: 'courses.overview'}">
        View all Courses
      </router-link>

      <router-link v-if="!isLoggedIn" :to="{name: 'categories.overview'}">
        View all Categories
      </router-link>

      <router-link v-if="!isLoggedIn" :to="{name: 'login'}">
        Login
      </router-link>

      <a v-if="isLoggedIn" @click="logout">
        Logout
      </a>
    </div>

    <div class="sticky-title">Sticky Title</div>

    <div class="content-container">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 0px;
}

.navigation-container {
  position: sticky;
  top: 0;
  background-color: #659DBD;
  padding: 10px;
  margin-bottom: 20px;
}

.app-title {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 145%;
  font-weight: 600;
  letter-spacing: 0.035em;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.navigation a {
  margin-right: 10px;
  color: #333;
  text-decoration: none;
}

.sticky-title {
  position: sticky;
  top: 39px;
  background-color: white;
  padding: 10px;
  margin-bottom: 20px;
}

.content-container {
  flex: 1;
}
</style>