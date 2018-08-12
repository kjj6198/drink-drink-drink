import Vue from 'vue';
import { FETCH_MENUS_SUCCESS, FETCH_MENU_SUCCESS } from './constants';

function mutations() {
  return {
    [FETCH_MENUS_SUCCESS](state, payload) {
      state.list = payload;
    },
  };
}

export default mutations();
