import Vue from 'vue';
import { GET_DRINK_SHOPS, GET_DRINK_SHOPS_SUCCESS } from './constants';

const makeMutations = () => ({
  [GET_DRINK_SHOPS](state, payload) {
    state.loading = true;
  },
  [GET_DRINK_SHOPS_SUCCESS](state, payload) {
    state.loading = false;
    Vue.set(state, 'list', payload);
  },
});

export default makeMutations();
