<template>
  <ErrorBoundary>
    <MenuProvider v-if="$route.path === '/'"/>
  </ErrorBoundary>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navbar from '@/components/Navbar';
import MenuProvider from '@/containers/MenuProvider';

export default {
  components: {
    ErrorBoundary,
    MenuProvider,
    Navbar,
  },
  computed: {
    ...mapState('user', ['isLoggedIn']),
  },
};
</script>
