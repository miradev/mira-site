import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/marketplace',
      name: 'marketplace',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: 'marketplace' */ '../views/Marketplace.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: 'login' */ '../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: 'register' */ '../views/Register.vue'),
    },
    {
      path: '/widget/:id',
      name: 'widget',
      component: () => import(/* webpackChunkName: 'widget' */ '../views/WidgetPage.vue'),
    },
    {
      path: '/*',
      name: 'comingsoon',
      component: () => import(/* webpackChunkName: 'comingsoon' */ '../views/ComingSoon.vue'),
    },
  ],
});
// # sourceMappingURL=index.js.map
