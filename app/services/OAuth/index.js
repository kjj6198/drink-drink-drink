import { Observable } from 'rxjs';
import { createAPI } from '@/api';
import loadScript from '@/utils/loadAsyncScript';
import { GOOGLE_API_CLIENT, GAUTH_CLIENT_ID } from './config';

export const login = () =>
  Observable.from(loadScript(GOOGLE_API_CLIENT))
    .switchMap(() => {
      const response = new Promise(resolve => {
        gapi.load('auth2', () =>
          resolve(gapi.auth2.init({ client_id: GAUTH_CLIENT_ID }))
        );
      });

      return Observable.fromPromise(response);
    })
    .mergeMap(instance =>
      Observable.from(instance.signIn()).map(
        result => result.getAuthResponse(true).id_token
      )
    )
    .switchMap(idToken =>
      createAPI('/user/sign_in', {
        method: 'POST',
        body: { id_token: idToken },
        crossDomain: true,
        withCredentials: true,
      }).map(ajaxResponse => ajaxResponse.response)
    );

export const logout = () =>
  createAPI('/user/logout', {
    method: 'POST',
    crossDomain: true,
    withCredentials: 'include',
  });

export const auth = () =>
  createAPI('/user/auth', {
    method: 'POST',
    crossDomain: true,
    withCredentials: 'include',
  });
