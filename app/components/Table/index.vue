<template>
  <table class="table">
    <caption></caption>
    <thead>
      <tr>
        <th v-for="key in Object.keys(config)" :key="key" :style="{ textAlign: config[key].align || 'left' }">
          {{ config[key].title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="d in data" :key="getKey(d, 'id')">
        <td v-for="key in Object.keys(config)" :key="key" :style="{ textAlign: config[key].align || 'left' }">
          <img class="avatar" :src="getData(d, key)" v-if="config[key].type === 'image' && getData(d, key)"/>
          <span v-else>{{ getData(d, key) }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// TODO: very very simple table
export default {
  data: () => ({}),
  methods: {
    getData(d, key) {
      const paths = key.split('.');
      return paths.reduce((acc, current) => acc[current], d);
    },
    getKey(d, field) {
      return (
        d[field] ||
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
          .substr(0, 5)
      );
    },
  },
  props: ['data', 'config'],
};
</script>

<style>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

table.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
}

.table th {
  padding: 10px;
  color: #444;
  background-color: aliceblue;
  border: 1px solid #ffffff;
}

.table tr > td {
  padding: 10px 13px;
}

.table tr:nth-child(odd) {
  background-color: #f8f8f8;
}
</style>
