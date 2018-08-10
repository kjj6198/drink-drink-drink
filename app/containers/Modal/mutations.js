import { OPEN_MODAL, CLOSE_MODAL } from './constants';

const makeMutations = () => ({
  [OPEN_MODAL](state, payload) {
    state.name = payload.name;
    state.params = payload.params;
  },
  [CLOSE_MODAL](state, payload) {
    state.name = null;
    state.params = {};
  },
});

export default makeMutations();
