import { courseStore } from 'domains/courses';
import { getLoggedInUser } from 'domains/auth';
import { lessonStore } from 'domains/lessons';
import Lesson from 'domains/lessons/types';

export function getUserCourses() {
  return getLoggedInUser.value?.courseIds.map(id => courseStore.getters.byId(id).value);
};

export function getLessonsByTutor() {
    return lessonStore.getters.all.value?.filter((lesson: Lesson) => lesson.tutorId === getLoggedInUser.value?.id);
};