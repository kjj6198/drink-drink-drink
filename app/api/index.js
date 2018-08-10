import { Observable } from 'rxjs';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://drink-17.herokuapp.com'
    : 'http://localhost:8080';

export const createAPI = (path, options = {}) =>
  Observable.ajax({
    url: `${baseURL}${path}`,
    headers: {
      'Content-Type': 'application/json',
    },
    crossDomain: true,
    body: options.body ? null : JSON.stringify(options.body),
    ...options,
  });

export const getMenus = () => createAPI('/menus');
export const getDrinkShops = () => createAPI('/drink_shops');
