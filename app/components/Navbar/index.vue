<template>
  <nav class="navbar">
    <Logo>17 Drink</Logo>
  </nav>
</template>
<script>
import styled from 'vue-styled-components';

const Logo = styled.h1`
  font-size: 1.75em;
`;

export default {
  name: 'Navbar',
  components: {
    Logo,
  },
};
</script>

<style scoped>
.navbar {
  width: 100%;
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 70px;
  color: #444;
  background-color: #fafafa;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1em;
}
</style>
