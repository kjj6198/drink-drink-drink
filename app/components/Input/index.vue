<template>
  <input
    :id="inputProps.name || null"
    :class="classNames"
    v-bind="inputProps"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange"
    @input="handleInput"
  />
</template>

<script>
export default {
  data: () => ({
    hasFocus: false,
  }),
  methods: {
    handleFocus(e) {
      this.hasFocus = true;
      this.$emit('focus', e);
    },
    handleBlur(e) {
      this.hasFocus = false;
      this.$emit('blur', e);
    },
    handleChange(e) {
      this.$emit('change', e);
    },
    handleInput(e) {
      this.$emit('input', e);
    },
  },
  props: {
    inputProps: { type: Object },
  },
  computed: {
    classNames() {
      return {
        'has-focus': this.hasFocus,
        'full-width': this.isFullWidth,
      };
    },
  },
};
</script>


<style scoped>
input[type='text'],
input[type='password'],
input[type='number'] {
  width: 100%;
  font-size: 16px;
  padding: 5px;
  outline: none;
  border: 0;
  box-shadow: 0 0 0 1px rgb(150, 150, 150);
  background-color: #fff;
}

input:disabled {
  box-shadow: 0 0 0 1px rgb(220, 220, 220);
  opacity: 0.5;
  cursor: not-allowed;
}

input:focus,
.has-focus {
  outline: none;
  box-shadow: 0 0 0 2px #27cc95;
}

input.full-width {
  width: 100%;
}
</style>

