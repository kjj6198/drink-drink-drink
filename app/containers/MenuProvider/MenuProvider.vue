<template>
    <Table>
      <thead>
        <tr><th>訂單名稱</th><th>商家名稱</th><th>倒數</th><th></th></tr>
      </thead>
      <tbody>
          <MenuItem v-for="menu in list"
            v-bind:key="menu.id"
            v-bind:menuName="menu.name"
            v-bind:shopName="menu.drink_shop.name"
            v-bind:countdown="menu.end_time"
          />
      </tbody>
    </Table>

</template>

<script>
import Vue from 'vue';
import { mapActions, mapState, mapGetters } from 'vuex';
import styled from 'vue-styled-components';
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
  }

  > tbody td {
    padding: 0.75rem;
    border: 1px solid #eee;
  }
`;

export default {
  mounted() {
    this.fetchMenus();
  },
  components: {
    Table,
    MenuItem,
  },
  computed: mapGetters({ list: 'menus/list' }),
  methods: {
    ...mapActions({ fetchMenus: 'menus/fetchMenus' }),
  },
};
</script>
