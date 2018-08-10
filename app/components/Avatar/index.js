import styled from 'vue-styled-components';

const props = {
  size: Number,
  src: String,
};

const Avatar = styled('img', props)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border: 50%;
`;

export default Avatar;
