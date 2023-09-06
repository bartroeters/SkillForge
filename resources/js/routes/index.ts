import { authRoutes, isLoggedIn } from 'domains/auth';
import { categoryRoutes } from 'domains/categories';
import { courseRoutes } from 'domains/courses';
import { lessonRoutes } from 'domains/lessons';
import { userRoutes } from 'domains/users';

const getRedirectPath = () => (isLoggedIn.value ? '/users/dashboard' : '/courses');

export const routes = [
  { path: '/:catchAll(.*)', redirect: getRedirectPath },
  { path: '/', redirect: getRedirectPath },
  ...categoryRoutes,
  ...authRoutes,
  ...courseRoutes,
  ...userRoutes,
  ...lessonRoutes,
];