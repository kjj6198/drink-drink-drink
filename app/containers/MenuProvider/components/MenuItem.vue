<template>
  <tr>
    <td>{{ menuName }}</td>
    <td>{{ shopName }}</td>
    <td>{{ isEnded ? countdown : 'Ended' }}</td>
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
  },
};
</script>
