import Vue from 'vue';
import {
  FETCH_MENUS_SUCCESS,
  FETCH_MENU_SUCCESS,
  CREATE_MENU_REQUEST,
  CREATE_MENU_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
} from './constants';

function mutations() {
  return {
    [FETCH_MENUS_SUCCESS](state, payload) {
      state.list = payload;
    },
    [CREATE_MENU_REQUEST](state) {
      state.loading = true;
    },
    [CREATE_MENU_SUCCESS](state, payload) {
      state.loading = false;
      state.list.unshift(payload);
    },
    [CREATE_ORDER_REQUEST](state) {
      state.loading = true;
    },
    [UPDATE_ORDER_SUCCESS](state, payload) {
      state.loading = false;
      const idx = state.list.findIndex(m => m.id === payload.menu_id);
      const orderIdx = state.list[idx].orders.findIndex(
        o => o.id === payload.id
      );
      Vue.set(state.list[idx].orders, orderIdx, payload);
    },
    [CREATE_ORDER_SUCCESS](state, payload) {
      state.loading = false;
      const idx = state.list.findIndex(m => m.id === payload.menu_id);

      if (idx > -1) {
        state.list[idx].orders.push(payload);
      }
    },
  };
}

export default mutations();
