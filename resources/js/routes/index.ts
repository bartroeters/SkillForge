import { authRoutes, isLoggedIn } from 'domains/auth';
import { categoryRoutes } from 'domains/categories';
import { courseRoutes } from 'domains/courses';
import { lessonRoutes } from 'domains/lessons';
import { userRoutes } from 'domains/users';

export const routes = [
  {
    path: '/',
    redirect: isLoggedIn ? '/users/dashboard' : '/courses'
  },
  ...categoryRoutes,
  ...authRoutes,
  ...courseRoutes,
  ...userRoutes,
  ...lessonRoutes,
];