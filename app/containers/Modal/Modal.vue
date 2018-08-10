<template>
  <ModalWrapper v-if="isOpened && name">
    <component
      v-if="isOpened && name && currentModal"
      :is="currentModal"
    ></component>
  </ModalWrapper>
</template>

<script>
import { Observable } from 'rxjs';
import styled from 'vue-styled-components';
import { mapState } from 'vuex';
import ModalWrapper from './ModalWrapper';
import CreateDrinkShopModal from './components/CreateDrinkShopModal';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(125, 125, 125, 0.7);
`;

const modals = {
  CreateDrinkShop: CreateDrinkShopModal,
};

export default {
  name: 'Modal',
  components: {
    ModalWrapper,
  },
  data: () => ({
    currentModal: null,
  }),
  updated() {
    this.currentModal = modals[this.name];

    if (this.isOpened) {
      document.body.classList.add('modal-active');
    }
  },
  beforeDestroy() {
    document.body.classList.remove('modal-active');
    if (this.escape$) {
      this.escape$.unsubscribe();
    }
  },
  computed: {
    ...mapState('modal', ['isOpened', 'name', 'params']),
  },
  methods: {
    closeModal(e) {
      this.$emit('closeModal', e);
    },
  },
};
</script>
