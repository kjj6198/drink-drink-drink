<script>
import styled from 'vue-styled-components';
import { mapActions, mapState } from 'vuex';
import Button from '@/components/Button';

const Logo = styled.h1`
  font-size: 1.75em;
`;

const OptionsWrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #fff;
`;

export default {
  name: 'Navbar',
  components: {
    Logo,
    OptionsWrapper,
    Avatar,
    Button,
  },
  computed: {
    ...mapState('user', ['isLoggedIn', 'info']),
  },
  methods: mapActions('user', ['doLogin', 'doLogout']),
};
</script>

<template>
  <nav class="navbar">
    <Logo>17 Drink</Logo>
    <OptionsWrapper>
      <router-link
        class="navbar-item"
        to="/drink_shops"
      >店家列表</router-link>
      <router-link
        v-show="isLoggedIn"
        class="navbar-item"
        to="/rank">排名榜</router-link>
      <router-link
        v-show="isLoggedIn"
        class="navbar-item"
        to="/me"
      >歷史訂單紀錄</router-link>
      <router-link
        v-show="isLoggedIn"
        class="navbar-item"
        to="/menus/new"
      >➕Drink 一下</router-link>
      <div class="navbar-item" v-show="isLoggedIn">
        <Avatar :src="info.picture" />
      </div>
      <div class="navbar-item" v-show="isLoggedIn">
        <Button :onClick="doLogout">登出</Button>
      </div>
      <div class="navbar-item" v-show="!isLoggedIn">
        <Button
          :onClick="doLogin"
          theme="outline"
          type="rounded"
        >登入</Button>
      </div>
    </OptionsWrapper>
  </nav>
</template>

<style scoped>
.navbar {
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  color: #444;
  background-color: #fafafa;
  border-bottom: 1px solid #ccc;
  margin-bottom: 1em;
}

.navbar-item {
  text-decoration: none;
  color: #444;
  font-size: 0.9rem;
  font-weight: bold;
}

.navbar-item:not(:last-child) {
  margin-right: 16px;
}
</style>
