import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import createEpicPlugin from './store/epicPlugin';
import './style.js';

import Home from './pages/Home.vue';

[Vuex, VueRouter].forEach(plugin => Vue.use(plugin));

const epicPlugin = createEpicPlugin();
const store = new Vuex.Store({
  plugins: [epicPlugin],
});

epicPlugin.run(action$ =>
  action$.ofType('menus/menus/FETCH_MENU_SUCCESS').mapTo({
    type: 'test',
  })
);

const routes = [{ path: '/', component: Home, props: true }];

const router = new VueRouter({
  routes,
});

const app = new Vue({
  router,
  store,
}).$mount('#root');
