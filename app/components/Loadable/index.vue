<template>
  <ErrorBoundary>
    <RenderComponent />
  </ErrorBoundary>
</template>

<script>
export default (options = {
  component,
  loading: '<span>loading...</span>',
  delay: 200,
  timeout: 10000,
}) => ({
  name: 'Loadable',
  components: {
    'RenderComponent': options,
  },
})
</script>
