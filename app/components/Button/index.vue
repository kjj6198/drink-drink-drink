<template>
  <Button
    @click="handleClick"
    :type="type"
    :theme="theme"
    :disabled="disabled"
  >
    <slot v-show="!to"></slot>
  </Button>
</template>

<script>
import styled, { css } from 'vue-styled-components';

const rectCSS = css`
  border-radius: 3px;
`;

const roundedCSS = css`
  border-radius: 20px;
`;

const type = {
  rect: rectCSS,
  rounded: roundedCSS,
};

const outlineCSS = css`
  box-shadow: 0 0 0 1px #454545;
`;

const filledCSS = css`
  background-color: #a1eeff;
  border: 0;
  color: #444;
`;

const disabledCSS = css`
  opacity: 0.5;
  background-color: rgba(156, 237, 255, 0.5);
  cursor: disabled;
`;

const theme = {
  outline: outlineCSS,
  filled: filledCSS,
};

const btnProps = {
  onClick: { type: Function, required: false },
  to: { type: String, required: false },
  disabled: { type: Boolean },
  size: {
    type: String,
    default: 'normal',
    validator: val => ['small', 'medium', 'large', 'normal'].includes(val),
  },
  theme: {
    default: 'outline',
    type: String,
    validator: val => ['outline', 'filled'].includes(val),
  },
  type: {
    type: String,
    default: 'rect',
    validator: val => ['rect', 'rounded'].includes(val),
  },
};

const Button = styled('button', btnProps)`
  padding: 7px 25px;
  white-space: nowrap;
  line-height: normal;
  text-align: center;
  color: #454545;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: 16px;

  ${props => theme[props.theme]};
  ${props => type[props.type]};

  &:disabled {
    ${disabledCSS};
  }

  &:hover {
    background-color: #4eb5cc;
    color: #efefef;
    box-shadow: 0 0 0 1px transparent;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default {
  components: {
    Button,
  },
  methods: {
    handleClick(e) {
      if (this.onClick) {
        e.preventDefault();
        this.onClick(e);
      }
      return null;
    },
  },
  props: btnProps,
};
</script>
