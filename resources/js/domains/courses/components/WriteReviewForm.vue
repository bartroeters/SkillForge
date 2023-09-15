<script setup lang="ts">
import { ref } from 'vue';
import { Review } from 'domains/reviews/types';
import { hasUserReviewedCourse } from 'domains/courses';
import { reviewStore } from 'domains/reviews';
import { resizeTextarea } from 'helpers/resize-text-area';
import { getLoggedInUser } from 'domains/auth';
import { useRoute } from 'vue-router';

const props = defineProps({
  review: { type: Object as () => Review}
})

const courseId = Number(useRoute().params.id);

const reviewSubmitted = ref(false);

const addReview = async () => {
  await reviewStore.actions.create(reviewData.value);
  reviewSubmitted.value = true;
}

const reviewData = ref({
  ...props.review,
  userId: getLoggedInUser.value?.id,
  courseId: courseId
} as Review);

const setRating = (rating: number) => {
  reviewData.value.rating = rating;
};
</script>

<template>
  <form @submit.prevent="addReview" class="review-form" v-if="!hasUserReviewedCourse(courseId)">
    <label for="comment" class="review-label">Write a review:</label>

    <div class="rating-stars">
      <template v-for="star in 5" :key="star">
        <span
          class="star"
          :class="{ 'filled-star': star <= reviewData.rating }"
          @click="setRating(star)"
        >★</span>
      </template>
    </div>

    <textarea
      name="comment"
      id="review"
      @input="resizeTextarea"
      v-model="reviewData.comment"
      style="width: 600px; resize: vertical;"
      class="review-textarea"
      placeholder="Share your thoughts..."
    ></textarea>

    <button class="review-submit-button">Submit</button>
  </form>

  <div v-if="reviewSubmitted" class="thank-you-message">
    Thank you for submitting your review!
  </div>
</template>

<style>
@import '../../../../css/show-page.css';
</style>