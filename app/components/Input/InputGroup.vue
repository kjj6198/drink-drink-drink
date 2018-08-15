<template>
  <label
    :class="classNames"
    :for="name"
  >
    <span class="input-label">{{ label }}</span>
    <select
      :id="name"
      class="select"
      v-if="type === 'option'"
      v-bind="$props"
    >
      <slot name="options"></slot>
    </select>
    <Input
      v-if="type !== 'option'"
      :inputProps="$props"
      @focus="isFocus = true"
      @blur="isFocus = false"
    />
  </label>
</template>

<script>
import Input from './';

export default {
  components: {
    Input,
  },
  data: () => ({
    isFocus: false,
  }),
  computed: {
    classNames() {
      return {
        'is-focus': this.isFocus,
        'form-group': true,
        'is-blocked': this.isBlocked,
      };
    },
  },
  props: {
    min: { type: Number },
    step: { type: Number },
    max: { type: Number },
    placeholder: { type: String },
    required: { type: Boolean },
    isBlocked: { type: Boolean },
    name: { type: String, required: true },
    label: { type: String, required: true },
    type: { type: String },
  },
};
</script>

<style scoped>
.select {
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-image: none;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.input-label {
  display: inline-block;
  color: #444;
  font-size: 0.8em;
}

.form-group.is-focus > .input-label {
  color: #27cc95;
}

.input-label ~ input {
  margin-top: 4px;
}

.form-group.is-blocked > .input-label ~ input {
  margin-top: 0;
}

.form-group.is-blocked > .input-label {
  display: inline-block;
  margin-right: 4px;
}

.form-group {
  width: 100%;
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.form-group:not(:last-child) {
  margin-bottom: 1em;
}

.form-group.is-blocked:not(:last-child) {
  margin-right: 1em;
}
.form-group.is-blocked {
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>
