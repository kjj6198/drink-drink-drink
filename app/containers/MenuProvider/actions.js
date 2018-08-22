import {
  createOrder as create,
  updateOrder as update,
  getMenus,
  getMenu,
  createMenu as createMenuAPI,
} from '@/api';
import {
  FETCH_MENUS_SUCCESS,
  FETCH_MENU_SUCCESS,
  CREATE_MENU_SUCCESS,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
} from './constants';

export const fetchMenus = context => {
  getMenus()
    .map(ajaxResponse => ajaxResponse.response)
    .subscribe(menus => context.commit(FETCH_MENUS_SUCCESS, menus));
};

export const fetchMenu = (context, menuID) => {
  getMenu(menuID)
    .map(ajaxResponse => ajaxResponse.response)
    .subscribe(menu => context.commit(FETCH_MENU_SUCCESS, menu));
};

export const createMenu = (context, payload) => {
  createMenuAPI(payload)
    .mergeMap(res => res.json())
    .catch(err => console.warn(err)) // TODO: unify error
    .subscribe(result => context.commit(CREATE_MENU_SUCCESS, result));
};

export const createOrder = (context, data) => {
  context.commit(CREATE_ORDER_REQUEST);
  create(data)
    .map(ajax => ajax.response)
    .subscribe(result => context.commit(CREATE_ORDER_SUCCESS, result));
};

export const updateOrder = (context, data) => {
  context.commit(CREATE_ORDER_REQUEST);
  update(data)
    .map(ajax => ajax.response)
    .subscribe(result => context.commit(UPDATE_ORDER_SUCCESS, result));
};
