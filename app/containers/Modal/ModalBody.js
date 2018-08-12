import styled from 'vue-styled-components';

const ModalBody = styled.div`
  position: relative;
  padding: 20px;
  z-index: 10;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  width: ${props => (props.isNarrow ? '35%' : '80%')};
  max-width: ${props => (props.isNarrow ? '600px' : '1280px')};
  min-height: 500px;
  height: 85vh;
  margin: auto;
  overflow-y: auto;

  & > img {
    max-width: 100%;
  }
`;

ModalBody.props = ['isOpened', 'isNarrow'];

export default ModalBody;
