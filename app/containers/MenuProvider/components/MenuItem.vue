<template>
  <tr class="menu-item">
    <td>{{ menuName }}</td>
    <td>{{ shopName }}</td>
    <td>
      <span v-if="isEnded">Ended</span>
      <Countdown v-else :endTime="new Date(countdown)" />
    </td>
    <td class="number">{{ availableOrders.length }}</td>
    <td class="number">{{ totalFormatted }}</td>
    <td><Button :onClick="() => openModal(menuID)" :disabled="isEnded" theme="filled" type="rect">我要訂飲料</Button></td>
  </tr>
</template>

<script>
import { mapActions } from 'vuex';
import Button from '@/components/Button';
import Countdown from '@/components/Countdown';

export default {
  name: 'MenuItem',
  components: {
    Button,
    Countdown,
  },
  props: {
    menuID: [String, Number],
    menuName: String,
    shopName: String,
    countdown: [String, Number],
    orders: Array,
    sum: Number,
  },
  methods: {
    openModal(menuID) {
      this.$store.commit('modal/OPEN_MODAL', {
        params: {
          menuID,
        },
        name: 'CreateOrder',
      });
    },
  },
  computed: {
    availableOrders() {
      return this.orders || [];
    },
    isEnded() {
      const { countdown } = this;
      const endTime = new Date(countdown);
      if (new Date(Date.now()) > endTime) {
        return true;
      }

      return false;
    },
    totalFormatted() {
      return (
        '$' +
        this.$props.sum.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      );
    },
  },
};
</script>

<style scoped>
.number {
  text-align: right;
}

.menu-item > td:last-child {
  text-align: center;
}
</style>
