import { User } from './types';
import { storeModuleFactory } from 'services/store';
import { createOverviewRoute } from 'services/router/factory';
import { computed } from 'vue';
import { getLessonsByTutor, getUserCourses } from 'services/utils/cross-domain-utils';

export const USER_DASHBOARD_DOMAIN_NAME = 'user-dashboard';
export const USER_DOMAIN_NAME = 'users';

export const userStore = storeModuleFactory<User>(USER_DOMAIN_NAME);

const createDashboardRouteWithLazyLoad = () => import('./pages/Dashboard.vue');

export const userRoutes = [
  createOverviewRoute(USER_DASHBOARD_DOMAIN_NAME, createDashboardRouteWithLazyLoad)
];

export const userCourses = computed(() => getUserCourses());

export const lessonsByTutor = computed(() => getLessonsByTutor());

export const getUserFullName = (user: User | number) =>  {
  if (typeof user === 'number') {
    const userId = user;
    const firstName = userStore.getters.byId(userId).value?.firstName;
    const lastName = userStore.getters.byId(userId).value?.lastName;
    return `${firstName} ${lastName}`;
  } else {
    return `${user.firstName} ${user.lastName}`;
  }
}