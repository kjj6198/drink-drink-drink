import { injectGlobal } from 'vue-styled-components';

injectGlobal`
body, html {
  font-size: 18px;
  margin: 0;  
}

*, *:before, *:after {
  box-sizing: border-box;
}
`;
