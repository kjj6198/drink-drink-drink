<template>
  <div>
    <Navbar :isLoggedIn="false" />
    <div class="container">
      <router-view></router-view>
    </div>
    <Modal />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  components: {
    Navbar,
    Modal: () => import(/* webpackChunkName: "Modal" */ '@/containers/Modal'),
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
