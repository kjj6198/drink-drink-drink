import { OPEN_MODAL, CLOSE_MODAL } from './constants';

export const openModal = (context, payload) =>
  context.commit(OPEN_MODAL, payload);
export const closeModal = context => context.commit(CLOSE_MODAL);
