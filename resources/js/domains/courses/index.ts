import { storeModuleFactory } from 'services/store';
import { createOverviewRoute, createShowRoute, createDashboardRoute, createEditRoute } from 'services/router/factory';
import Course from './types';
import OverviewVue from './pages/Overview.vue';
import ShowVue from './pages/Show.vue';
import DashboardVue from './pages/Dashboard.vue';
import EditVue from './pages/Edit.vue';
import { getLoggedInUser } from 'domains/auth';
import { User } from 'domains/users/types';
import { lessonStore } from 'domains/lessons';
import { userStore } from 'domains/users';

export const COURSE_DOMAIN_NAME = 'courses';

export const courseStore = storeModuleFactory<Course>(COURSE_DOMAIN_NAME);

export const courseRoutes = [
  createOverviewRoute(COURSE_DOMAIN_NAME, OverviewVue),
  createShowRoute(COURSE_DOMAIN_NAME, ShowVue),
  createDashboardRoute(COURSE_DOMAIN_NAME, DashboardVue),
  createEditRoute(COURSE_DOMAIN_NAME, EditVue)
];

export const getCourseTutors = (courseId: number): User[] => {
  const courseLessons = lessonStore.getters.all.value.filter(lesson => lesson.courseIds.includes(courseId));
  
  const uniqueTutorIds = [...new Set(courseLessons.map(lesson => lesson.tutorId))];
  
  return uniqueTutorIds.map(tutorId => userStore.getters.byId(tutorId).value);
};


export function isUserEnrolledInCourse(courseId: number): boolean {
  const loggedInUser = getLoggedInUser.value;
  return loggedInUser ? loggedInUser.courseIds.includes(courseId) : false;
};

export const getCourseValue = (courseId: number): Course => {
  return courseStore.getters.byId(courseId).value;
}