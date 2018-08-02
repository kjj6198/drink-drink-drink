<template>
  <tr>
    <td>{{ menuName }}</td>
    <td>{{ shopName }}</td>
    <td>{{ isEnded ? countdown : 'Ended' }}</td>
    <td class="number">{{ orders.length }}</td>
    <td class="number">{{ totalFormatted }}</td>
    <td>GO TO Order</td>
  </tr>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menuID: [String, Number],
    menuName: String,
    shopName: String,
    countdown: [String, Number],
    isEnded: Boolean,
    orders: Array,
    total: Number,
  },
  computed: {
    totalFormatted() {
      return (
        '$' +
        this.$props.total.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
      );
    },
  },
};
</script>

<style scoped>
.number {
  text-align: right;
}
</style>
