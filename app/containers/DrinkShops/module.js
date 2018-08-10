import * as actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  mutations,
  actions,
  state: {
    list: [],
    loading: false,
  },
};
