import { Observable } from 'rxjs';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://drink-17.herokuapp.com'
    : 'http://localhost:8080';

export const createAPI = (path, options = {}) =>
  Observable.ajax({
    url: `${baseURL}${path}`,
    crossDomain: true,
    body: options.body ? null : JSON.stringify(options.body),
    ...options,
  });

export const getMenu = menuID => createAPI(`/menus/${menuID}`);
export const getMenus = () => createAPI('/menus');
export const getDrinkShops = () => createAPI('/drink_shops');
export const getRanks = () => createAPI('/stats/all_ranks');
export const getMyRank = () =>
  createAPI('/user/myrank', {
    withCredentials: true,
  }).map(ajaxReponse => ajaxReponse.response);

export const createDrinkShop = data =>
  fetch(`${baseURL}/drink_shop`, {
    method: 'POST',
    credentials: 'include',
    body: data,
  });

export const createMenu = data =>
  Observable.from(
    fetch(`${baseURL}/menus`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(data),
    })
  );

export const mutateOrder = (method = 'POST') => ({
  orderID = '',
  menuID,
  name,
  price,
  note,
}) =>
  createAPI(`/orders${method === 'PUT' ? `/${orderID}` : ''}`, {
    method,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      menu_id: menuID,
      name,
      price,
      note,
    }),
  });
export const createOrder = mutateOrder('POST');
export const updateOrder = mutateOrder('PUT');
