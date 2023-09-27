import { getLoggedInUser } from 'domains/auth';
import { lessonStore } from 'domains/lessons';
import { courseStore } from 'domains/courses';
import Lesson from 'domains/lessons/types';
import { useRoute } from 'vue-router';

export function getUserCourses() {
  return getLoggedInUser.value?.courseIds.map(id => courseStore.getters.byId(id).value);
};

export function getLessonsByTutor() {
    return lessonStore.getters.all.value?.filter((lesson: Lesson) => lesson.tutorId === getLoggedInUser.value?.id);
};

export function getDashboardLink() {
  const route = useRoute();
  const redirectedFromUserDashboard = route.query.sourceRoute === 'user-dashboard.overview';
  const redirectedFromCourseDashboard = route.query.sourceRoute === 'course-dashboard.show';
  const courseId = Number(route.query.sourceCourseId);

  if (redirectedFromUserDashboard) {
    return { name: 'user-dashboard.overview' };
  } else if (redirectedFromCourseDashboard && !isNaN(courseId)) {
    return { name: 'course-dashboard.show', params: { id: courseId } };
  } else {
    return {};
  }
}