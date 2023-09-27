import { storeModuleFactory } from 'services/store';
import Announcement from './types';
import { lessonStore } from 'domains/lessons';

const ANNOUNCEMENT_DOMAIN_NAME = 'announcements';

export const announcementStore = storeModuleFactory<Announcement>(ANNOUNCEMENT_DOMAIN_NAME);

export const getAnnouncementValue = (announcementId: number): Announcement => {
  return announcementStore.getters.byId(announcementId).value
}

export const getAnnouncementValues = (courseId: number): Announcement[] => {
  return announcementStore.getters.all.value?.filter(announcement => announcement.courseId === courseId);
}