<script setup lang="ts">
import { computed } from 'vue';
import { getCurrentRouteId, getCurrentRouteName } from 'services/router';
import { courseStore, isUserEnrolledInCourse, getCourseTutors } from '..';
import { isLoggedIn } from 'domains/auth';
import PageTitle from 'components/PageTitle.vue';
import { getUserFullName, userStore } from 'domains/users';
import { getReviewValue, reviewStore } from 'domains/reviews';
import { lessonStore } from 'domains/lessons';
import WriteReviewForm from '../components/WriteReviewForm.vue';
import { getVisibleItems, setItemVisibility, toggleContent } from 'helpers/get-formatted-content';
import { formatDate } from 'helpers/date-time-formatter';

const courseId = getCurrentRouteId();
const course = courseStore.getters.byId(courseId);

userStore.actions.getAll();
courseStore.actions.getAll();
reviewStore.actions.getAll();
lessonStore.actions.getAll();

const courseTitle = computed(() => `${course.value?.title}`);

const reviewVisibilityFlags = computed(() => setItemVisibility.value);
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
            href="#review"
            class="write-review-link"
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
      <h3>Reviews</h3>

      <write-review-form v-if="isUserEnrolledInCourse(courseId)">
        form to write review
      </write-review-form>

      <div v-for="(review, index) in getVisibleItems(getReviewValue(courseId), 2)" :key="index">
        <p>{{ review.rating }}</p>
        <p>{{ review.comment }}</p>
        <p>
          <div>Review by {{ review.userId }}</div>
          <div>{{ formatDate(review.createdAt) }}</div>
        </p>
      </div>

      <button @click="toggleContent()" class="toggle-content-button">
        {{ reviewVisibilityFlags ? 'Show less &uarr;' : 'Read all reviews &darr;' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '../../../../css/show-page.css';
</style>