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
  courseId: Number(useRoute().params.id),
  rating: 4
} as Review);
</script>

<template>
  <form @submit.prevent="addReview">
    <label for="comment">Write a review:</label>

    <div>★★★★★</div>

    <textarea
      name="comment"
      id="review"
      @input="resizeTextarea"
      v-model="reviewData.comment"
      style="width: 600px; resize: vertical;"
    ></textarea>

    <button>Submit</button>
  </form>
</template>