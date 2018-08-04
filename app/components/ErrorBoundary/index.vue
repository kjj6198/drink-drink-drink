<template>
  <div v-if="!hasError">
    <slot></slot>
  </div>
  <!-- TODO: prettify error -->
  <p v-else-if="hasError && error">某樣東西出錯了</p>
</template>

<script>
export default {
  name: 'ErrorBoundary',
  data: () => ({
    hasError: false,
    error: null,
  }),
  components: {},
  errorCaptured(err, vm, info) {
    this.hasError = true;
    this.error = err;
    // [TODO] enhance error logger when demo done
    // send log.
    console.warn(info, vm);
  },
};
</script>

