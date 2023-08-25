import Category from './types';
import { storeModuleFactory } from 'services/store';
import OverviewPage from './pages/Overview.vue';
import { createOverviewRoute, createShowRoute } from 'services/router/factory';
import ShowVue from 'domains/categories/pages/Show.vue';

export const CATEGORY_DOMAIN_NAME = 'categories';

export const categoryStore = storeModuleFactory<Category>(CATEGORY_DOMAIN_NAME);

export const categoryRoutes = [
  createOverviewRoute(CATEGORY_DOMAIN_NAME, OverviewPage),
  createShowRoute(CATEGORY_DOMAIN_NAME, ShowVue)
]

export const getSortedCategories = () => {
  return categoryStore.getters.all.value.sort(
    (categoryA, categoryZ) => categoryA.title.localeCompare(categoryZ.title)
  )
}

export const getCategoryValue = (categoryId: number): Category => {
  return categoryStore.getters.byId(categoryId).value;
}