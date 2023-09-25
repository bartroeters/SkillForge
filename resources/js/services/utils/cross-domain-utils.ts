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
  const redirectedFromUserDashboard = useRoute().query.sourceRoute === 'users.dashboard';
  const redirectedFromCourseDashboard = useRoute().query.sourceRoute === 'courses.dashboard';

  if (redirectedFromUserDashboard) {
    return { name: 'users.dashboard' };
  } else if (redirectedFromCourseDashboard) {
    return { name: 'courses.dashboard' };
  } else {
    return {};
  }
}