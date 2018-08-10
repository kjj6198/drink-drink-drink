import * as actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state: {
    name: null,
    isOpened: false,
    params: {},
  },
  mutations,
  actions,
};
