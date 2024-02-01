import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/Accueil' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'Accueil',
          component: () => import('../pages/Accueil.vue'),
        },
        {
          path: 'account-settings',
  

          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/vide1.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/vide2.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'AjouterEntreprise/:type',
          name: 'addForm',
          props: true,
          component: () => import('../pages/AjouterEntreprise.vue'),
        },
        {
          path: 'AjouterEntreprise',
          component: () => import('../pages/AjouterEntreprise.vue'),
        },
        {
          path: 'GérerDemandes',
          component: () => import('../pages/GérerDemandes.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router
