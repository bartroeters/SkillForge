<script setup lang="ts">
import { computed } from 'vue';
import { getCurrentRouteId, getCurrentRouteName } from 'services/router';
import { courseStore, isUserEnrolledInCourse } from '..';
import { getLoggedInUser, isLoggedIn } from 'domains/auth';
import PageTitle from 'components/PageTitle.vue';
import { getUserFullName, userStore } from 'domains/users';

const courseId = getCurrentRouteId();
const course = courseStore.getters.byId(courseId);
const user = userStore.getters.byId(1);

console.log(user);

userStore.actions.getAll();
courseStore.actions.getAll();

const courseTitle = computed(() => `${course.value?.title}`);

console.log(getLoggedInUser.value?.profilePicture);
console.log(getLoggedInUser)
</script>

<template>
  <page-title :text="courseTitle"/>

  <div class="content-container">
    <div class="course-container">
      <div class="thumbnail-side-menu-wrapper">
        <img :src="course?.thumbnail" :alt="course?.title">

        <span class="side-menu">
          <router-link
          :to="isLoggedIn
            ? { name: 'courses.edit', params: { id: courseId } }
            : { name: 'enroll', params: { id: courseId }, query: { sourceRoute: getCurrentRouteName() } }"
            class="enroll-course-link"
            >
            <span class="hidden-arrow">&rarr;</span>
            Enroll in course
          </router-link>

          <router-link
            v-if="isUserEnrolledInCourse(courseId)"
            :to="{name: 'courses.dashboard'}"
            class="review-course-link"
            >
            <span class="hidden-arrow">&rarr;</span>
            Go to dashboard
          </router-link>

          <router-link
            v-if="isUserEnrolledInCourse(courseId)"
            :to="{name: 'courses.dashboard'}"
            class="review-course-link"
            >
            <span class="hidden-arrow">&rarr;</span>
            Write a review
          </router-link>
        </span>
      </div>

      <div class="title-description-wrapper">
        <h3 class="about-course">About {{ course?.title }}</h3>
        <p class="course-description">{{ course?.description }}</p>
      </div>
    </div>

    <div class="tutor-container" v-if="isLoggedIn && getLoggedInUser">
      <img :src="getLoggedInUser?.profilePicture" :alt="getUserFullName(getLoggedInUser)">
      <img :src="'/storage/profile-pictures/' + getLoggedInUser?.profilePicture" :alt="getUserFullName(getLoggedInUser)">
      <img :src="'/storage/profile-pictures/3023969.jpg'" :alt="`retrieving profile photo directly from the storage`" height="150" width="150">
    </div>
  </div>
</template>

<style scoped>
.content-container {
  display: block;
  border: 1px solid #dddddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  padding: 0 0 20px 20px;

}

.course-container,
.tutor-container {
  display: flex;
}

.thumbnail-side-menu-wrapper {
  flex: 0 0 35%;
}

img {
  margin: 33px 0 25px 0;
  max-width: 100%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  border-radius: 10%;
}

.side-menu > a {
  display: flex;
  color: #007bff;
  text-decoration: none;
  font-family: 'Courier New', Courier, monospace;
  font-size: 15px;
  line-height: 200%;
  letter-spacing: .1px;
}

.side-menu:hover {
  color: #0056b3;
  letter-spacing: .2px;
}

.hidden-arrow {
  display: none;
}

.enroll-course-link:hover .hidden-arrow,
.review-course-link:hover .hidden-arrow {
  display: inline;
  margin-right: 20px;
}

.about-course {
  padding-left: 50px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 24px;
  letter-spacing: .5px;
}

.course-description {
  font-size: 17px;
  margin: 20px;
  line-height: 1.5;
  color: #555;
  text-align: justify;
}
</style>