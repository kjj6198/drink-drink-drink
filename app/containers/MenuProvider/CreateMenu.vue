<template>
  <div>
    <form id="create_menu" ref="menu">
      <div v-if="errors.length > 0">
        <li v-for="error in errors" v-text="error" :key="error" />
      </div>
      <InputGroup
        label="訂單名稱"
        type="text"
        name="name"
        placeholder="請輸入訂單"
        :required="true"
      />
      <InputGroup
        type="option"
        label="飲料店家"
        name="drink_shop_id"
        :required="true"
      >
        <template slot="options">
          <option
            v-for="drinkShop in drinkShops"
            :value="drinkShop.id"
            :key="`${drinkShop.id}${drinkShop.name}`"
          >{{ drinkShop.name }}</option>
        </template>
      </InputGroup>
      <InputGroup
        label="時間（單位：分）"
        type="number"
        name="end_time"
        :min="5"
        :step="5"
        required
      />
      <InputGroup
        label="Notify Channel"
        placeholder="which channel do you want to notify? e.g: #dev-frontend"
        name="channel"
        type="text"
      />
    </form>
    <Button :onClick="handleSubmit">新增訂單</Button>
  </div>
</template>

<script>
import Button from '@/components/Button';
import InputGroup from '@/components/Input/InputGroup';
import { getDrinkShops, createMenu } from '@/api';
import formDataToJSON from '@/utils/formDataToJSON';

export default {
  components: {
    Button,
    InputGroup,
  },
  created() {
    getDrinkShops()
      .map(ajax => ajax.response)
      .subscribe(drinkShops => (this.drinkShops = drinkShops));
  },
  data: () => ({
    errors: [],
    drinkShops: [],
  }),
  methods: {
    // TODO: better validation
    handleSubmit() {
      if (!this.$refs.menu.checkValidity()) {
        this.errors.push('請填寫時間、名稱、及飲料店家');
        return;
      }
      const data = new FormData(this.$refs.menu);
      const duration = parseInt(data.get('end_time'), 10);
      data.set(
        'end_time',
        Math.floor((Date.now() + duration * 1000 * 60) / 1000)
      );
      createMenu(formDataToJSON(data, ['end_time', 'drink_shop_id'])).subscribe(
        result => {
          this.$refs.menu.reset();
          this.$router.push({ path: '/menu' });
        }
      );
    },
  },
};
</script>

<style scoped>
form#create_menu {
  margin-bottom: 1em;
}
</style>
