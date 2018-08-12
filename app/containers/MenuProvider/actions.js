import { getMenus, getMenu } from '@/api';
import { FETCH_MENUS_SUCCESS, FETCH_MENU_SUCCESS } from './constants';

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
