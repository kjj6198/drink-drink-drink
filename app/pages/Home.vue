<template>
  <div>
    <ErrorBoundary>
      <Navbar :isLoggedIn="false" />
      <MenuProvider />
    </ErrorBoundary>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ErrorBoundary from '@/components/ErrorBoundary';
import MenuProvider from '@/containers/MenuProvider';
import Navbar from '@/components/Navbar';

export default {
  components: {
    ErrorBoundary,
    Navbar,
    MenuProvider,
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
