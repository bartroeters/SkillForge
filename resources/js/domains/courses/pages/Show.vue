<script setup lang="ts">
import { computed } from 'vue';
import { getCurrentRouteId, getCurrentRouteName } from 'services/router';
import { courseStore, isUserEnrolledInCourse, getCourseTutors } from '..';
import { getLoggedInUser, isLoggedIn } from 'domains/auth';
import PageTitle from 'components/PageTitle.vue';
import { getUserFullName, userStore } from 'domains/users';
import { getReviewValue, reviewStore } from 'domains/reviews';
import { lessonStore } from 'domains/lessons';

const courseId = getCurrentRouteId();
const course = courseStore.getters.byId(courseId);

userStore.actions.getAll();
courseStore.actions.getAll();
reviewStore.actions.getAll();
lessonStore.actions.getAll();

const courseTitle = computed(() => `${course.value?.title}`);
</script>

<template>
  <page-title :text="courseTitle"/>

  <div class="content-container">
    <!-- Course container -->
    <div class="course-container">
      <!-- Title and description -->
      <div class="title-description-wrapper">
        <h3 class="">About {{ course?.title }}</h3>
        <p class="course-description">{{ course?.description }}</p>
      </div>

      <!-- Thumbnail and side menu -->
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

          <a
            v-if="isUserEnrolledInCourse(courseId)"
            href="#write-review"
            class="review-course-link"
            >
            <span class="hidden-arrow">&rarr;</span>
            Write a review
        </a>
        </span>
      </div>
    </div>

    <!-- course info -->
    <div class="course-information">
      <h3>Programme</h3>
      <div>{{ course?.programme }}</div>
    </div>

    <div class="course-information">
      <h3>After your studies</h3>
      <div>{{ course?.prospects }}</div>
    </div>

    <!-- Tutors Container -->
    <div class="tutors-container">
      <h3>Our dedicated teachers</h3>

      <div class="tutor-grid">
        <div v-for="(tutor, index) in getCourseTutors(courseId)" :key="index" class="tutor-item">
          <img :src="tutor.profilePicture" :alt="getUserFullName(tutor)" height="135" width="108">
          <p>{{ getUserFullName(tutor) }}</p>
          <p>{{ tutor.email }}</p>
        </div>
      </div>
    </div>

    <!-- Reviews container -->
    <div class="reviews-container">
      <h3>All Reviews</h3>

      <div v-for="(review, index) in getReviewValue(courseId)" :key="index">
        <p>{{ review.comment }}</p>
        <p>{{ review.rating }}</p>
      </div>
    </div>

    <div id="write-review">
      form to write review
    </div>
  </div>
</template>

<style scoped>
* {
  color: #555;
}

h3 {
  padding-left: 50px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 24px;
  color: #2d2f31;
  letter-spacing: .5px;
}

.content-container {
  display: block;
  border: 1px solid #dddddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  padding: 0 0 20px 20px;
}

.course-container {
  display: flex;
  flex-direction: row-reverse;
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

.course-description {
  font-size: 17px;
  margin: 20px;
  line-height: 1.5;
  text-align: justify;
}

.course-information {
  font-size: 17px;
  margin: 20px;
  line-height: 1.5;
  text-align: justify;
}

.tutor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  text-align: end;
}

.tutor-grid p {
  margin: 2px;
}
</style>