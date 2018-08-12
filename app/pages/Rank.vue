<template>
  <div>
    <Loading v-if="loading" />
    <table v-show="!loading" class="table">
      <thead>
        <tr>
          <th>排名</th>
          <th>#</th>
          <th>姓名</th>
          <th class="number">累積金額</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rank in ranks" :key="rank.username">
          <td class="rank">
            <div class="rank-num">{{ rank.myrank }}</div>
          </td>
          <td :style="{ textAlign: 'center' }"><img
            v-if="rank.picture"
            :src="rank.picture"
            :alt="rank.username"
            class="avatar"
            />
            <span v-show="!rank.picture">N/A</span>
          </td>
          <td :style="{ textAlign: 'center' }">{{ rank.username }}</td>
          <td class="number" v-formatted="rank.sum">{{ rank.sum }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getRanks } from '@/api';
import Loading from '@/components/LoadingCircle';
import formatNumber from '@/utils/formatNumber';

export default {
  created() {
    this.loading = true;
    this.subscription$ = getRanks()
      .map(ajaxResponse => ajaxResponse.response)
      .subscribe(ranks => {
        this.ranks = ranks;
        this.loading = false;
      });
  },
  data: () => ({
    subscription$: null,
    loading: false,
    ranks: [],
  }),
  components: {
    Loading,
  },
  directives: {
    formatted: {
      bind(el, binding) {
        el.textContent = formatNumber(binding.value);
      },
    },
  },
  beforeDestroy() {
    this.subscription$.unsubscribe();
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table .number {
  text-align: right;
  font-family: Oswald;
}

.table tr td.number {
  font-size: 1.25em;
}

.table > thead > tr th {
  padding: 10px 15px;
  font-weight: bold;
}

.table > tbody tr > td {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.rank {
  text-align: center;
}

.rank-num {
  display: inline-block;
  text-align: center;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background-color: red;
  color: #fff;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  box-shadow: 0 0 0 2px #555;
}
</style>
