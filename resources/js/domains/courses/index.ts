import { storeModuleFactory } from 'services/store';
import { createOverviewRoute, createShowRoute, createEditRoute } from 'services/router/factory';
import Course from './types';
import OverviewVue from './pages/Overview.vue';
import ShowVue from './pages/Show.vue';
import DashboardVue from './pages/Dashboard.vue';
import EditVue from './pages/Edit.vue';
import { getLoggedInUser } from 'domains/auth';
import { User } from 'domains/users/types';
import { Review } from 'domains/reviews/types';
import { lessonStore } from 'domains/lessons';
import { userStore } from 'domains/users';
import { reviewStore } from 'domains/reviews';
import Lesson from 'domains/lessons/types';

export const COURSE_DOMAIN_NAME = 'courses';
export const COURSE_DASHBOARD_DOMAIN_NAME = 'course-dashboard';

export const courseStore = storeModuleFactory<Course>(COURSE_DOMAIN_NAME);

export const courseRoutes = [
  createOverviewRoute(COURSE_DOMAIN_NAME, OverviewVue),
  createShowRoute(COURSE_DOMAIN_NAME, ShowVue),
  createShowRoute(COURSE_DASHBOARD_DOMAIN_NAME, DashboardVue),
  createEditRoute(COURSE_DOMAIN_NAME, EditVue)
]

export const getCourseValue = (courseId: number): Course => {
  return courseStore.getters.byId(courseId).value;
}

export const getSortedCourses = () => {
  return courseStore.getters.all.value.sort(
    (courseA, courseZ) => courseA.title.localeCompare(courseZ.title)
  )
}

export const getCourseTutors = (courseId: number): User[] => {
  const courseLessons = lessonStore.getters.all.value.filter((lesson: Lesson) => lesson.courseIds.includes(courseId));
  
  const uniqueTutorIds = [...new Set(courseLessons.map((lesson: Lesson) => lesson.tutorId))];
  
  return uniqueTutorIds.map(tutorId => userStore.getters.byId(tutorId).value);
}

export function getCourseLessons(courseId: number): Lesson[] {
  return lessonStore.getters.all.value.filter((lesson: Lesson) => lesson.courseIds.includes(courseId));
}

export function isUserEnrolledInCourse(courseId: number): boolean {
  const loggedInUser = getLoggedInUser.value;
  return loggedInUser ? loggedInUser.courseIds.includes(courseId) : false;
}

export function hasUserReviewedCourse(courseId: number): boolean {
  const loggedInUser = getLoggedInUser.value;
  const reviews = reviewStore.getters.all.value;
  
  if (loggedInUser && reviews) {
    const reviewsByUser = reviews.filter((review: Review) => {
      return review.userId === loggedInUser.id && review.courseId === courseId;
    })

    if (reviewsByUser !== null) {
      return reviewsByUser.some(review => review.courseId === courseId);
    }
  }

  return false;
}

export function getStarRating(rating: number): string[] {
  const starCount = 5;
  const stars: string[] = Array(starCount).fill('☆');
  const filledStars = Math.floor(rating);
  
  if (filledStars > 0) {
    stars.fill('★', 0, filledStars);
  }

  if (rating - filledStars >= 0.5) {
    stars[filledStars] = '☆';
  }

  return stars;
}