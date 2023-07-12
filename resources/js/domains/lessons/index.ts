import { storeModuleFactory } from 'services/store';
import { createShowRoute } from 'services/router/factory';
import Lesson from './types';
import ShowVue from './pages/Show.vue';

export const LESSON_DOMAIN_NAME = 'lessons';

export const lessonStore = storeModuleFactory<Lesson>(LESSON_DOMAIN_NAME);

export const lessonRoutes = [
    createShowRoute(LESSON_DOMAIN_NAME, ShowVue)
];