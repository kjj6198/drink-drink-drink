import { FETCH_MENUS_SUCCESS } from './constants';
import { getMenus } from '@/api';

export const fetchMenus = context => {
  getMenus()
    .map(ajaxResponse => ajaxResponse.response)
    .subscribe(menus => context.commit(FETCH_MENUS_SUCCESS, menus));
};
