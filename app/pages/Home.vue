<template>
  <div>
    <ErrorBoundary>
      <p>hello world</p>
    </ErrorBoundary>
  </div>
</template>

<script>
import ErrorBoundary from '@/components/ErrorBoundary';

export default {
  
  data: () => ({
    names: [
      { id: 1, text: 'hello' },
      { id: 2, text: 'kalan' },
      { id: 3, text: null },
    ]
  }),
  errorCaptured: console.log,
  components: {
    ErrorBoundary,
  },
};
</script>
