import { User } from './types';
import { storeModuleFactory } from 'services/store';
import { createDashboardRoute } from 'services/router/factory';
import { courseStore } from 'domains/courses';
import { computed } from 'vue';
import { getLoggedInUser } from 'domains/auth';
import { lessonStore } from 'domains/lessons';
import Lesson from 'domains/lessons/types';

export const USER_DOMAIN_NAME = 'users';

export const userStore = storeModuleFactory<User>(USER_DOMAIN_NAME);

const createDashboardRouteWithLazyLoad = () => import('./pages/Dashboard.vue');

export const userRoutes = [
  createDashboardRoute(USER_DOMAIN_NAME, createDashboardRouteWithLazyLoad, { auth: true, canSeeWhenLoggedIn: true })
];

export const userCourses = computed(() => getLoggedInUser.value?.courseIds.map(id => courseStore.getters.byId(id)));

export const lessonsByTutor = computed(() => lessonStore.getters.all.value?.filter((lesson: Lesson) => lesson.tutorId === getLoggedInUser.value?.id));

export const getUserFullName = (user: User) =>  `${user.firstName} ${user.lastName}`;

export const getLessonValue = (lessonId: number) => {
  return lessonStore.getters.byId(lessonId).value;
};

export const getCourseValue = (courseId: number) => {
  return courseStore.getters.byId(courseId).value;
};