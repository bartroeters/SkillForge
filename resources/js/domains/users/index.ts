import { User } from './types';
import { storeModuleFactory } from 'services/store';
import { createDashboardRoute } from 'services/router/factory';
import DashboardVue from './pages/Dashboard.vue';

export const USER_DOMAIN_NAME = 'users';

export const userStore = storeModuleFactory<User>(USER_DOMAIN_NAME);

export const userRoutes = [
  createDashboardRoute(USER_DOMAIN_NAME, DashboardVue, {auth: true, canSeeWhenLoggedIn: true})
];

export const getUserFullName = (userId: number) => {
  const firstName = userStore.getters.byId(userId).value?.firstName;
  const lastName = userStore.getters.byId(userId).value?.lastName;
  return `${firstName} ${lastName}`;
};
