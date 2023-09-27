import {Meta} from '../types';
import {RouteComponent} from 'vue-router';

export const CREATE_PAGE_NAME = '.create';
export const EDIT_PAGE_NAME = '.edit';
export const OVERVIEW_PAGE_NAME = '.overview';
export const SHOW_PAGE_NAME = '.show';
export const DASHBOARD_PAGE_NAME ='.dashboard';

export const createShowRoute = (module: string, component: RouteComponent, meta?: Meta) => ({
  path: `/${module}/:id`,
  name: module + SHOW_PAGE_NAME,
  component,
  meta: meta ? meta : {auth: false, canSeeWhenLoggedIn: true},
});

export const createCreateRoute = (module: string, component: RouteComponent, meta?: Meta) => ({
  path: `/${module}/create`,
  name: module + CREATE_PAGE_NAME,
  component,
  meta: meta ? meta : {auth: true, canSeeWhenLoggedIn: true},
});

export const createOverviewRoute = (module: string, component: RouteComponent, meta?: Meta) => ({
  path: `/${module}`,
  name: module + OVERVIEW_PAGE_NAME,
  component,
  meta: meta ? meta : {auth: false, canSeeWhenLoggedIn: true},
});

export const createEditRoute = (module: string, component: RouteComponent, meta?: Meta) => ({
  path: `/${module}/:id/edit`,
  name: module + EDIT_PAGE_NAME,
  component,
  meta: meta ? meta : {auth: true, canSeeWhenLoggedIn: true},
});