import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue'), meta: { showHeader: false } },
      {
        path: 'login',
        component: () => import('pages/authentication/LoginPage.vue'),
        meta: { showHeader: false },
      },
      {
        path: 'register',
        component: () => import('pages/authentication/RegisterPage.vue'),
        meta: { showHeader: false },
      },
      {
        path: 'user',
        children: [
          {
            path: 'home',
            component: () => import('pages/user/HomePage.vue'),
            meta: { showHeader: true },
          },
          {
            path: 'friends',
            component: () => import('pages/user/UsersPage.vue'),
            meta: { showHeader: true },
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
