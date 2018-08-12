<template>
  <ModalBody>
    <form
      ref="drink_shop"
      id="drink_shop"
      action="http://localhost:8080/drink_shop"
      method="POST"
      enctype="multipart/form-data"
    >
        <label for="name">
          <span>店家名稱</span>
          <input id="name" type="text" name="name" required />
        </label>
        <label for="address">
          <span>地址</span>
          <input type="text" name="address" required />
        </label>
        <label for="phone">
          <span>電話</span>
          <input type="tel" name="phone" />
        </label>
        <label for="comment">
          <span>推薦原因</span>
          <input type="text" name="comment" />
        </label>
        <label for="file">
          <span>圖片</span>
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            @change="handleFileUpload"
          />
        </label>
    </form>
    <Button
      :onClick="handleSubmit"
    >建立飲料店</Button>
  </ModalBody>  
</template>

<script>
import { mapActions } from 'vuex';
import { createDrinkShop } from '@/api';
import Button from '@/components/Button';
import ModalBody from '../ModalBody';

export default {
  data: () => ({
    result: '',
    loading: false,
  }),
  components: {
    ModalBody,
    Button,
  },
  methods: {
    ...mapActions('drinkShops', ['addDrinkShop']),
    ...mapActions('modal', ['closeModal']),
    handleSubmit() {
      const form = new FormData(this.$refs.drink_shop);
      if (this.$refs.drink_shop.checkValidity()) {
        this.loading = true;
        createDrinkShop(form)
          .then(res => res.json())
          .then(data => this.addDrinkShop(data))
          .then(() => {
            this.loading = false;
            this.$refs.drink_shop.reset();
          });
        return;
      }
    },
    // TODO: make file uploader a component. worth it?
    handleFileUpload(e) {
      const reader = new FileReader();
      const file = e.target.files[0];
      if (file) {
        reader.readAsDataURL(file);
        reader.addEventListener('load', () => (this.result = reader.result));
      }
    },
  },
};
</script>

<style scoped>
.preview {
  max-width: 100%;
}

#drink_shop label {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
}

#drink_shop label span {
  display: inline-block;
  width: 25%;
  text-align: right;
  margin-right: 0.3em;
}

#drink_shop label > input {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  outline: none;
}
</style>
