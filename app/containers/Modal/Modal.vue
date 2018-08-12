<template>
  <ModalWrapper
    v-if="isOpened && name"
    @click.self="closeModal"
  >
    <component
      v-if="isOpened && name && currentModal"
      :is="currentModal"
    ></component>
  </ModalWrapper>
</template>

<script>
import styled from 'vue-styled-components';
import { Observable } from 'rxjs';
import { mapState, mapActions } from 'vuex';
import ModalWrapper from './ModalWrapper';
import CreateOrderModal from './components/CreateOrderModal';
import CreateDrinkShopModal from './components/CreateDrinkShopModal';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(125, 125, 125, 0.7);
`;

const modals = {
  CreateOrder: CreateOrderModal,
  CreateDrinkShop: CreateDrinkShopModal,
};

export default {
  name: 'Modal',
  data: () => ({
    keydown$: null,
  }),
  components: {
    ModalWrapper,
  },
  mounted() {
    this.keydown$ = Observable.fromEvent(document, 'keydown')
      .filter(e => e.keyCode === 27 && this.isOpened && this.name)
      .subscribe(e => this.closeModal(e));
  },
  data: () => ({
    currentModal: null,
  }),
  updated() {
    this.currentModal = modals[this.name];

    if (this.isOpened) {
      document.body.classList.add('modal-active');
    } else {
      document.body.classList.remove('modal-active');
    }
  },
  beforeDestroy() {
    document.body.classList.remove('modal-active');
  },
  computed: {
    ...mapState('modal', ['isOpened', 'name', 'params']),
  },
  methods: {
    ...mapActions('modal', ['closeModal']),
  },
};
</script>
