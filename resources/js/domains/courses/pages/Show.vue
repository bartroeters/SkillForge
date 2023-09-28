<script setup lang="ts">
import { computed } from 'vue';
import { getCurrentRouteId, getCurrentRouteName } from 'services/router';
import { courseStore, isUserEnrolledInCourse, getCourseTutors, getStarRating } from '..';
import { isLoggedIn } from 'domains/auth';
import PageTitle from 'components/PageTitle.vue';
import { getUserFullName, userStore } from 'domains/users';
import { reviewStore } from 'domains/reviews';
import { lessonStore } from 'domains/lessons';
import WriteReviewForm from '../components/WriteReviewForm.vue';
import { toggleContent, initializeVisibilityFlags, initializeToggle, getVisibleItems } from 'helpers/get-formatted-content';
import { formatDate } from 'helpers/date-time-formatter';
import { getSortedReviewValues } from 'domains/reviews';

const courseId = getCurrentRouteId();
const course = courseStore.getters.byId(courseId);

userStore.actions.getAll();
courseStore.actions.getAll();
reviewStore.actions.getAll();
lessonStore.actions.getAll();

const courseTitle = computed(() => `${course.value?.title}`);

initializeToggle(['tutors', 'reviews']);
const visibilityFlags = initializeVisibilityFlags(['tutors', 'reviews']);
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
            : { name: 'enroll', params: { id: courseId }, query: { sourceRoute: getCurrentRouteId() } }"
            class="enroll-course-link"
            >
            <span class="hidden-arrow">&rarr;</span>
            Enroll in course
          </router-link>

          <router-link
            v-if="isUserEnrolledInCourse(courseId)"
            :to="{name: 'course-dashboard.show', params: {id: courseId}}"
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
        <div v-for="(tutor, index) in getVisibleItems('tutors', getCourseTutors(courseId), 3)" :key="index">
          <img :src="tutor?.profilePicture" :alt="getUserFullName(tutor)" height="135" width="108">
          <p>{{ getUserFullName(tutor) }}</p>
          <p>{{ tutor.email }}</p>
        </div>
      </div>

      <button @click="toggleContent('tutors')" class="toggle-content-button">
        {{ visibilityFlags.tutors.value ? 'Show less &uarr;' : 'View all teachers &darr;' }}
      </button>
    </div>

    <!-- Reviews container -->
    <div class="reviews-container">
      <h3>Reviews</h3>

      <write-review-form v-if="isUserEnrolledInCourse(courseId)" />
      
      <div v-for="(review, index) in getVisibleItems('reviews', getSortedReviewValues(courseId), 2)" :key="index" class="review-seperator">
        <span v-for="star in getStarRating(review.rating)" :key="star" style="margin-right: 5px;">{{ star }}</span>
        <p>{{ review.comment }}</p>
        <p class="review-details">
          <span>by {{ getUserFullName(review.userId) }}, </span>
          <span>{{ formatDate(review.createdAt) }}</span>
        </p>
      </div>

      <button @click="toggleContent('reviews')" class="toggle-content-button">
        {{ visibilityFlags.reviews.value ? 'Show less &uarr;' : 'Read all reviews &darr;' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '../../../../css/show-course.css';
</style>