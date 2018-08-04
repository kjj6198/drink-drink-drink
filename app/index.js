import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import createEpicPlugin from './store/epicPlugin';
import userModule from '@/containers/AuthProvider/module';
import './style.js';

import Home from './pages/Home.vue';

[Vuex, VueRouter].forEach(plugin => Vue.use(plugin));

const epicPlugin = createEpicPlugin();
const store = new Vuex.Store({
  plugins: [epicPlugin],
  modules: {
    user: userModule,
  },
});

const routes = [{ path: '/', component: Home, props: true }];

const router = new VueRouter({
  mode: 'history',
  routes,
});

const app = new Vue({
  router,
  store,
}).$mount('#root');
