<template>
  <ModalWrapper>
    <slot></slot>
  </ModalWrapper>
</template>

<script>
import { Observable } from 'rxjs';
import styled from 'styled-components';
import ModalWrapper from './ModalWrapper';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(125, 125, 125, 0.7);
`;

export default {
  name: 'Modal',
  components: {
    ModalWrapper,
  },
  created() {
    this.escape$ = Observable.fromEvent(document, 'keydown')
      .filter(e => e.keyCode === 27) // ESC
      .subscribe(() => this.closeModal())
  },
  mounted() {

  },
  beforeDestroy() {
    if (this.escape$) {
      this.escape$.unsubscribe();
    }
  },
  methods: {
    closeModal()
  }
}
</script>
