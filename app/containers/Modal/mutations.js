import { OPEN_MODAL, CLOSE_MODAL } from './constants';

const makeMutations = () => ({
  [OPEN_MODAL](state, payload) {
    state.isOpened = true;
    state.name = payload.name;
    state.params = payload.params;
  },
  [CLOSE_MODAL](state, payload) {
    state.name = null;
    state.isOpened = false;
    state.params = {};
  },
});

export default makeMutations();
