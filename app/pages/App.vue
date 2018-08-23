<template>
  <ErrorBoundary>
    <Navbar :isLoggedIn="false" />
    <div class="container">
      <router-view></router-view>
    </div>
    <Modal />
  </ErrorBoundary>
</template>

<script>
import { mapActions } from 'vuex';
import ErrorBoundary from '@/components/ErrorBoundary';
import Navbar from '@/components/Navbar';

export default {
  created() {
    if (!this.isLoggedIn) {
      this.doAuth();
    }
  },
  components: {
    ErrorBoundary,
    Navbar,
    Modal: () => import(/* webpackChunkName: "Modal" */ '@/containers/Modal'),
  },
  methods: {
    ...mapActions('user', ['doAuth']),
  },
};
</script>

<style scoped>
.container {
  max-width: 1380px;
  width: 75%;
  margin: 0 auto;
}
</style>
