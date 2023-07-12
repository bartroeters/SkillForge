import {categoryRoutes} from 'domains/categories';
import {authRoutes} from 'domains/auth';
import {courseRoutes} from 'domains/courses';
import {userRoutes} from 'domains/users';
import {lessonRoutes} from 'domains/lessons';

export const routes = [
    {
        path: '/',
        redirect: '/courses'
      },
      ...categoryRoutes,
      ...authRoutes,
      ...courseRoutes,
      ...userRoutes,
      ...lessonRoutes,
];
