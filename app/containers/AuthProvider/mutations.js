import Vue from 'vue';
import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGIN,
  LOGOUT,
  LOGGING_ERROR,
  AUTH,
} from './actions';

export default () => ({
  [LOGIN_REQUEST](state) {
    state.loading = true;
  },
  [LOGIN](state, payload) {
    Vue.set(state, 'info', payload);
    state.loading = false;
    state.isLoggedIn = true;
  },
  [LOGGING_ERROR](state, payload) {
    Vue.set(state, 'error', payload);
    state.loading = false;
  },
  [LOGOUT_REQUEST](state) {
    state.loading = true;
  },
  [LOGOUT](state) {
    state.loading = false;
    Vue.set(state, 'info', {});
    state.isLoggedIn = false;
  },
  [AUTH](state, payload) {
    if (payload) {
      Vue.set(state, 'info', payload);
      state.isLoggedIn = true;
    }
  },
});
