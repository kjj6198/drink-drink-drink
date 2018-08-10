import { OPEN_MODAL, CLOSE_MODAL } from './constants';

export const openModal = context => context.commit(OPEN_MODAL, params);
export const closeModal = context => context.commit(CLOSE_MODAL, params);
