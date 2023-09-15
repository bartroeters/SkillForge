import { storeModuleFactory } from 'services/store';
import { Review } from './types';

export const REVIEW_DOMAIN_NAME = 'reviews';

export const reviewStore = storeModuleFactory<Review>(REVIEW_DOMAIN_NAME);

export const getSortedReviews = () => {
  return reviewStore.getters.all.value.sort((oldReview, newReview) => {
    return oldReview.createdAt.localeCompare(newReview.createdAt);
  });
}

export const getReviewValue = (courseId: number): Review[] => {
  const reviews = reviewStore.getters.all.value;

  return reviews.filter((review: Review) => review.courseId === courseId)
                .map((review: Review) => Object.freeze(review));
}

export const getSortedReviewValues = (courseId: number): Review[] => {
  const reviews = reviewStore.getters.all.value;

  const reviewValues = reviews
    .filter((review: Review) => review.courseId === courseId)
    .map((review: Review) => Object.freeze(review));

    return reviewValues.sort((oldReview, newReview) => {
      const oldestReview = new Date(oldReview.createdAt).getTime();
      const newestReview = new Date(newReview.createdAt).getTime();
      return oldestReview - newestReview;
  }).reverse();
}