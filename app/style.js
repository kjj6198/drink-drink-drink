import { injectGlobal } from 'vue-styled-components';

injectGlobal`
body, html {
  font-size: 18px;
  margin: 0;  
}

body.modal-active {
  overflow: hidden;
}

*, *:before, *:after {
  box-sizing: border-box;
}
`;
