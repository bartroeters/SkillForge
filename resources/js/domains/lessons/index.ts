import { storeModuleFactory } from 'services/store';
import { createShowRoute, createCreateRoute, createEditRoute } from 'services/router/factory';
import Lesson from './types';
import ShowVue from './pages/Show.vue';
import CreateVue from './pages/Create.vue';
import EditVue from './pages/Edit.vue';

export const LESSON_DOMAIN_NAME = 'lessons';

export const lessonStore = storeModuleFactory<Lesson>(LESSON_DOMAIN_NAME);

export const lessonRoutes = [
  createShowRoute(LESSON_DOMAIN_NAME, ShowVue),
  createCreateRoute(LESSON_DOMAIN_NAME, CreateVue),
  createEditRoute(LESSON_DOMAIN_NAME, EditVue)
];