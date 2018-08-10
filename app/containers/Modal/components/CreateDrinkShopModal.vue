<template>
  <ModalBody @closeModal="closeModal">
    <form name="order">
      <div>
        <label for="orderName">飲料名稱</label>
        <input id="orderName" type="text" v-model="name">
      </div>
      <div>
        <label for="orderPrice">價格</label>
        <input id="orderPrice" type="text" v-model.number="price">
      </div>
      <div>
        <label for="orderNote">備註</label>
        <input id="orderNote" type="text" v-model="note" />
      </div>
      
    </form>    
  </ModalBody>
</template>

<script>
import { mapActions } from 'vuex';
import ModalBody from '../ModalBody';
export default {
  components: {
    ModalBody,
  },
  data: () => ({
    name: '',
    price: 10,
    note: '',
  }),
  methods: {
    ...mapActions('modal', ['closeModal']),
  },
};
</script>
