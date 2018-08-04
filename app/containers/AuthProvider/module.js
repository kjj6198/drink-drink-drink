import { doLogin, doLogout, doAuth } from './actions';
import makeMutations from './mutations';

export default {
  namespaced: true,
  state: {
    info: {},
    loading: false,
    isLoggedIn: false,
  },
  actions: { doLogin, doLogout, doAuth },
  mutations: makeMutations(),
};
