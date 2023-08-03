import { storeModuleFactory } from 'services/store';
import { createShowRoute, createCreateRoute } from 'services/router/factory';
import Lesson from './types';
import ShowVue from './pages/Show.vue';
import CreateVue from './pages/Create.vue';

export const LESSON_DOMAIN_NAME = 'lessons';

export const lessonStore = storeModuleFactory<Lesson>(LESSON_DOMAIN_NAME);

export const lessonRoutes = [
  createShowRoute(LESSON_DOMAIN_NAME, ShowVue),
  createCreateRoute(LESSON_DOMAIN_NAME, CreateVue)
];