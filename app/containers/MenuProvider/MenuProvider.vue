<template>
    <Table>
      <thead>
        <tr>
          <th>訂單名稱</th>
          <th>商家名稱</th>
          <th>倒數</th>
          <th>杯數</th>
          <th>訂單金額</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
          <LoadingCircle v-if="loading" />
          <MenuItem v-for="menu in list"
            :key="menu.id"
            :menuID="menu.id"
            :menuName="menu.name"
            :shopName="menu.drink_shop && menu.drink_shop.name"
            :countdown="menu.end_time"
            :orders="menu.orders"
            :sum="menu.sum"
          />
      </tbody>
    </Table>

</template>

<script>
import Vue from 'vue';
import { mapActions, mapState, mapGetters } from 'vuex';
import styled from 'vue-styled-components';
import LoadingCircle from '@/components/LoadingCircle';
import MenuItem from './components/MenuItem';

const Table = styled.table`
  max-width: 1200px !important;
  width: 100%;
  margin: 0 auto;
  table-layout: fixed;
  border-collapse: collapse;

  > thead th {
    padding: 15px;
    vertical-align: bottom;
    color: #444;
    background-color: #c1f2ff;
    border: 1px solid #fff;
  }

  > tbody td {
    padding: 0.75rem;
    border: 1px solid #eee;
  }

  > tbody tr:nth-child(2n) {
    background-color: #f8f8f8;
  }
`;

export default {
  created() {
    if (this.list.length === 0) {
      this.fetchMenus();
    }
  },
  components: {
    Table,
    MenuItem,
  },
  computed: {
    ...mapState('menus', ['loading']),
    ...mapGetters({
      list: 'menus/list',
    }),
  },
  methods: {
    ...mapActions({ fetchMenus: 'menus/fetchMenus' }),
  },
};
</script>
