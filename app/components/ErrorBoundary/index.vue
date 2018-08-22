<template>
  <div v-if="!hasError">
    <slot></slot>
  </div>
  <!-- TODO: prettify error -->
  <p
    class="error"
    v-else-if="hasError && error">
    如果你看到這則訊息，代表有地方出錯了，請趕快告訴管理員以便修復 bug。
  </p>
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

<style scoped>
.error {
  color: #fe6565;
}
</style>
