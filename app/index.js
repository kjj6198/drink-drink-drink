import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import './style.js';

import Home from './pages/Home.vue';

[Vuex, VueRouter].forEach(plugin => Vue.use(plugin));

const store = new Vuex.Store({});

const routes = [{ path: '/', component: Home, props: true }];

const router = new VueRouter({
  routes,
});

const app = new Vue({
  router,
  store,
}).$mount('#root');
