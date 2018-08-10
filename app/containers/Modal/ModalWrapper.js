import styled from 'vue-styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1000;
  transition: opacity 0.2s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: ${props => (props.active && props.overlay ? 'auto' : 'none')};
`;

export default ModalWrapper;
