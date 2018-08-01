import { Observable } from 'rxjs';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://drink-17.herokuapp.com/menu.json'
    : 'http://localhost:8080/menus.json';

export const getMenus = () => Observable.ajax(baseURL);
