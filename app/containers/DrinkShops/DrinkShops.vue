<template>
  <div>
    <TitleWrapper>
      <h3 class="title">飲料店家列表</h3>
      <Button
        type="rect"
        theme="outline"
        :onClick="() => openModal({ name: 'CreateDrinkShop', params: {} } )"
      >+ 新增飲料店</Button>
    </TitleWrapper>
    <Loading v-if="loading"/>
    <ListWrapper v-if="!loading">
      <Item v-for="drinkShop in list" :key="drinkShop.id">
        <h3>{{ drinkShop.name }}</h3>
        <ul>
          <li>電話：{{ drinkShop.phone }}</li>
          <li>地址：{{ drinkShop.address }}</li>
          <li v-if="drinkShop.comment">推薦原因：{{ drinkShop.comment }}</li>
        </ul>
      </Item>
    </ListWrapper>
  </div>
</template>

<script>
import styled from 'vue-styled-components';
import Loading from '@/components/LoadingCircle';
import Button from '@/components/Button';
import { mapActions, mapState } from 'vuex';

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;

  > .title {
    margin: 0;
  }
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  margin-bottom: 1em;
`;

const Item = styled.div`
  padding: 10px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

export default {
  mounted() {
    this.fetchDrinkShops();
  },
  components: {
    ListWrapper,
    Item,
    TitleWrapper,
    Button,
  },
  computed: {
    ...mapState('drinkShops', ['list', 'loading']),
  },
  methods: {
    ...mapActions('drinkShops', ['fetchDrinkShops']),
    ...mapActions('modal', ['openModal']),
  },
};
</script>

<style scoped>
.title {
  color: #434343;
}

.link {
  color: inherit;
  text-decoration: underline;
}
</style>
