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
          path: 'InformationsEntreprise/:id',
          props:true,
          name:'acc',
          component: () => import('../pages/InformationsEntreprise.vue'),
        },
        {
          path: 'MesDemandes',
          component: () => import('../pages/MesDemandes.vue'),
        },
        {
          path: 'AffichageTableVisiteur',
          component: () => import('../pages/AffichageTableVisiteur.vue'),
        },
        {
          path: 'DemandeAcces',
          component: () => import('../pages/DemandeAcces.vue'),
        },
        {
          path: 'AffichageTableEntreprise',
          component: () => import('../pages/AffichageTableEntreprise.vue'),
        },
        {
          path: 'LesFormulairesAjout/:type/:id',
          name: 'addFormEmp',
          props: true,
          component: () => import('../pages/LesFormulairesAjout.vue'),
        },
        {
          path: 'LesFormulairesAjout/:type',
          name: 'addForm',
          props: true,
          component: () => import('../pages/LesFormulairesAjout.vue'),
        },
        {
          path: 'LesFormulairesAjout',
          component: () => import('../pages/LesFormulairesAjout.vue'),
        },
        {
          path: 'GererDemandes',
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
