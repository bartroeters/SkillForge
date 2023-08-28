import { storeModuleFactory } from 'services/store';
import { createOverviewRoute, createShowRoute, createDashboardRoute, createEditRoute } from 'services/router/factory';
import Course from './types';
import OverviewVue from './pages/Overview.vue';
import ShowVue from './pages/Show.vue';
import DashboardVue from './pages/Dashboard.vue';
import { categoryStore } from 'domains/categories';
import Category from 'domains/categories/types';
import EditVue from './pages/Edit.vue';

export const COURSE_DOMAIN_NAME = 'courses';

export const courseStore = storeModuleFactory<Course>(COURSE_DOMAIN_NAME);

export const courseRoutes = [
  createOverviewRoute(COURSE_DOMAIN_NAME, OverviewVue),
  createShowRoute(COURSE_DOMAIN_NAME, ShowVue),
  createDashboardRoute(COURSE_DOMAIN_NAME, DashboardVue),
  createEditRoute(COURSE_DOMAIN_NAME, EditVue)
];

export const getCourseValue = (courseId: number): Course => {
  return courseStore.getters.byId(courseId).value;
};