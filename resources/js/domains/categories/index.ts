import Category from './types';
import { storeModuleFactory } from 'services/store';
import OverviewPage from './pages/Overview.vue';
import { createOverviewRoute, createShowRoute } from 'services/router/factory';
import ShowVue from 'domains/courses/pages/Show.vue';

export const CATEGORY_DOMAIN_NAME = 'categories';

export const categoryStore = storeModuleFactory<Category>(CATEGORY_DOMAIN_NAME);

export const categoryRoutes = [
    createOverviewRoute(CATEGORY_DOMAIN_NAME, OverviewPage, {auth: false, canSeeWhenLoggedIn: true}),
    createShowRoute(CATEGORY_DOMAIN_NAME, ShowVue)
];

export const getSortedCategories = () => {
    return categoryStore.getters.all.value.sort((categoryA, categoryZ) =>
        categoryA.name.localeCompare(categoryZ.name)
    );
};
