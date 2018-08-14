import Vue from 'vue';
import {
  FETCH_MENUS_SUCCESS,
  FETCH_MENU_SUCCESS,
  CREATE_MENU_REQUEST,
  CREATE_MENU_SUCCESS,
} from './constants';

function mutations() {
  return {
    [FETCH_MENUS_SUCCESS](state, payload) {
      state.list = payload;
    },
    [CREATE_MENU_REQUEST](state, payload) {
      state.loading = true;
    },
    [CREATE_MENU_SUCCESS](state, payload) {
      state.loading = false;
      state.list.unshift(payload);
    },
  };
}

export default mutations();
