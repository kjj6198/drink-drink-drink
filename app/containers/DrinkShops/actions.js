import { getDrinkShops } from '@/api';
import { CLOSE_MODAL } from '@/containers/Modal/constants';
import { GET_DRINK_SHOPS_SUCCESS, ADD_DRINK_SHOP } from './constants';

export const fetchDrinkShops = context =>
  getDrinkShops()
    .map(ajaxResponse => ajaxResponse.response)
    .subscribe(drinkShops =>
      context.commit(GET_DRINK_SHOPS_SUCCESS, drinkShops)
    );

export const addDrinkShop = (context, payload) => {
  context.commit(ADD_DRINK_SHOP, payload);
  context.commit(`modal/${CLOSE_MODAL}`, {}, { root: true });
};
