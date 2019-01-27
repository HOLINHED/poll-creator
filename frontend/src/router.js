import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/new',
      name: 'createPoll',
      component: () => import('./views/Create.vue'),
    },
    {
      path: '/poll',
      name: 'poll',
      component: () => import('./views/Poll.vue'),
    },
    {
      path: '/*',
      name: 'notFound',
      component: () => import('./views/notFound.vue'),
    },
  ],
});
