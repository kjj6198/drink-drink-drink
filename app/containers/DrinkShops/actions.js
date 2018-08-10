import { getDrinkShops } from '@/api';
import { GET_DRINK_SHOPS_SUCCESS } from './constants';

export const fetchDrinkShops = context =>
  getDrinkShops()
    .map(ajaxResponse => ajaxResponse.response)
    .subscribe(drinkShops =>
      context.commit(GET_DRINK_SHOPS_SUCCESS, drinkShops)
    );
