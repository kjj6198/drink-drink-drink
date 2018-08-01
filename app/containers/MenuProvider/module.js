import * as actions from './actions';
import mutations from './mutations';
import * as selectors from './selectors';

export default {
  namespaced: true,
  state: {
    list: [],
  },
  actions,
  mutations,
  getters: {
    list: selectors.selectMenuList(),
  },
};
