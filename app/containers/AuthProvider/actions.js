import { login, logout, auth } from '@/services/OAuth';
import LocalStorage from '@/services/LocalStorage';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN = 'LOGIN';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT = 'LOGOUT';
export const LOGGING_ERROR = 'LOGGING_ERROR';
export const AUTH = 'AUTH';

const KEY_USER_INFO = 'DRINK/KEY_USER_INFO';

export const doLogin = context => {
  context.commit(LOGIN_REQUEST);
  login()
    .do(user => LocalStorage.setItem(KEY_USER_INFO, user))
    .catch(err => {
      context.commit(LOGGING_ERROR, err);
      return Observable.throw(err);
    })
    .subscribe(user => context.commit(LOGIN, user));
};

export const doLogout = context => {
  context.commit(LOGOUT_REQUEST);
  logout()
    .catch(err => {
      LocalStorage.removeItem(KEY_USER_INFO);
      return Observable.throw(err);
    })
    .do(() => LocalStorage.removeItem(KEY_USER_INFO))
    .subscribe(() => context.commit(LOGOUT));
};

export const doAuth = context => {
  auth()
    .map(() => LocalStorage.getItem(KEY_USER_INFO))
    .subscribe(user => context.commit(AUTH, user));
};
