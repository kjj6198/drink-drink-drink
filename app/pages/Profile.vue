<template>
  <div>
    <h2>我的歷史紀錄</h2>
    <ul v-if="me.rank">
      <li>排名： 第 {{ me.rank.myrank }} 名</li>
      <li>累積金額： {{ me.rank.sum }}</li>
    </ul>
    <Table
      :config="config"
      :data="me.orders"
    />
  </div>
</template>

<script>
import { getMyRank } from '@/api';
import Table from '@/components/Table';

export default {
  created() {
    getMyRank().subscribe(rank => this.$set(this.$data, 'me', rank));
  },
  data: () => ({
    me: {},
  }),
  components: {
    Table,
  },
  computed: {
    config() {
      return {
        name: { title: '飲料名稱' },
        note: { title: '備註' },
        price: { title: '價格', align: 'right' },
        created_at: { title: '日期', align: 'center', custom: true },
      };
    },
  },
};
</script>
