import { storeModuleFactory } from 'services/store';
import Review from './types';

export const REVIEW_DOMAIN_NAME = 'reviews';

export const reviewStore = storeModuleFactory<Review>(REVIEW_DOMAIN_NAME);

export const getReviewValue = (reviewId: number): Review => {
  return reviewStore.getters.byId(reviewId).value;
};