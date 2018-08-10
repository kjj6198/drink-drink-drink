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
  created() {
    if (!this.isLoggedIn) {
      this.doAuth();
    }
  },
  computed: {
    ...mapState('user', ['isLoggedIn']),
  },
  methods: {
    ...mapActions('user', ['doAuth']),
  },
};
</script>
