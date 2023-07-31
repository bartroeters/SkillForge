import { storeModuleFactory } from 'services/store';
import { createOverviewRoute, createShowRoute, createDashboardRoute } from 'services/router/factory';
import { Course } from './types';
import OverviewVue from './pages/Overview.vue';
import ShowVue from './pages/Show.vue';
import DashboardVue from './pages/Dashboard.vue';
import { computed } from 'vue';

export const COURSE_DOMAIN_NAME = 'courses';

export const courseStore = storeModuleFactory<Course>(COURSE_DOMAIN_NAME);

export const courseRoutes = [
  createOverviewRoute(COURSE_DOMAIN_NAME, OverviewVue, {auth: false, canSeeWhenLoggedIn: true}),
  createShowRoute(COURSE_DOMAIN_NAME, ShowVue),
  createDashboardRoute(COURSE_DOMAIN_NAME, DashboardVue)
];