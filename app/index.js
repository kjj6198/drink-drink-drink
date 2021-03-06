import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { sync } from 'vuex-router-sync';
import createEpicPlugin from './store/epicPlugin';
import userModule from '@/containers/AuthProvider/module';
import './style.js';

import Home from './pages/Home';
import App from './pages/App';
import Navbar from '@/components/Navbar';

[Vuex, VueRouter].forEach(plugin => Vue.use(plugin));

const epicPlugin = createEpicPlugin();
const store = new Vuex.Store({
  plugins: [epicPlugin],
  modules: {
    user: userModule,
  },
});

const routes = [
  {
    path: '/',
    component: Home,
    props: true,
  },
  {
    path: '/me',
    component: () =>
      import(/* webpackChunkName: "Profile" */ '@/pages/Profile'),
    props: true,
  },
  {
    path: '/menus/new',
    component: () =>
      import(/* webpackChunkName: "CreateMenu" */ '@/pages/NewMenu'),
  },
  {
    path: '/menus/:menu_id',
    component: () =>
      import(/* webpackChunkName: "CreateOrder" */ '@/containers/Modal/components/CreateOrderModal'),
  },
  {
    path: '/drink_shops',
    component: () =>
      import(/* webpackChunkName: "DrinkShops" */ '@/containers/DrinkShops'),
    props: true,
  },
  {
    path: '/stats/ranks',
    component: () => import(/* webpackChunkName: "Rank" */ '@/pages/Rank'),
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

sync(store, router);

const app = new Vue({
  router,
  store,
  components: { App },
}).$mount('#root');
