import styled from 'vue-styled-components';

const ModalBody = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  width: ${props => (props.isNarrow ? '35%' : '50%')};
  max-width: ${props => (props.isNarrow ? '600px' : '960px')};
  height: 75vh;
  margin: auto;
  overflow-y: scroll;
`;

ModalBody.props = ['isOpened', 'isNarrow'];

export default ModalBody;
