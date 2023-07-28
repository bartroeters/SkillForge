import { User } from './types';
import { storeModuleFactory } from 'services/store';
import { createDashboardRoute } from 'services/router/factory';
import { courseStore } from 'domains/courses';
import { computed } from 'vue';

export const USER_DOMAIN_NAME = 'users';

export const userStore = storeModuleFactory<User>(USER_DOMAIN_NAME);

const createDashboardRouteWithLazyLoad = () => import('./pages/Dashboard.vue');

export const userRoutes = [
  createDashboardRoute(USER_DOMAIN_NAME, createDashboardRouteWithLazyLoad, { auth: true, canSeeWhenLoggedIn: true })
];

export const getUserFullName = (user: User) =>  `${user.firstName} ${user.lastName}`;

export const getCourseTitle = (courseId: number) => {
  return courseStore.getters.byId(courseId).value?.title;
};
