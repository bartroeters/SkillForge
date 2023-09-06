<script setup lang="ts">
import { ref } from 'vue';
import { Review } from 'domains/reviews/types';
import { reviewStore } from 'domains/reviews';
import { resizeTextarea } from 'helpers/resize-text-area';
import { getLoggedInUser } from 'domains/auth';
import { useRoute } from 'vue-router';

const props = defineProps({
  review: { type: Object as () => Review}
})

const addReview = async () => {
  await reviewStore.actions.create(reviewData.value)
}

const reviewData = ref({
  ...props.review,
  userId: getLoggedInUser.value?.id,
  courseId: Number(useRoute().params.id)
} as Review);

const setRating = (rating: number) => {
  reviewData.value.rating = rating;
};
</script>

<template>
  <form @submit.prevent="addReview" class="review-form">
    <label for="comment" class="review-label">Write a review:</label>

    <!-- <div class="rating-stars">★★★★★</div> -->

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
</template>

<style>
@import '../../../../css/show-page.css';
</style>