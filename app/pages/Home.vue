<template>
  <div>
    <ErrorBoundary>
      <Navbar />
      <MenuProvider />
    </ErrorBoundary>
  </div>
</template>

<script>
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingCircle from '@/components/LoadingCircle';
import MenuProvider from '@/containers/MenuProvider';
import Navbar from '@/components/Navbar';

export default {
  components: {
    ErrorBoundary,
    Navbar,
    MenuProvider,
    LoadingCircle,
  },
  methods: {},
};
</script>
