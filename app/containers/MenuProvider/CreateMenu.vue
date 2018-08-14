<template>
  <div>
    <form id="create_menu" ref="menu">
      <div v-show="errors.length > 0">
        <li v-for="error in errors" v-text="error" :key="error" `/>
      </div>
      <label>
        <span>訂單名稱</span>
        <input type="text" name="name" required />
      </label>
      <label>
        <span>飲料店家</span>
        <select name="drink_shop_id" required>
          <option
            v-for="drinkShop in drinkShops"
            :value="drinkShop.id"
            :key="`${drinkShop.id}${drinkShop.name}`"
          >{{ drinkShop.name }}</option>
        </select>
      </label>
      <label>
        <span>時間（單位：分）</span>
        <input type="number" min="5" step="5" required />
      </label>
      <label>
        <span>Notify Channel</span>
        <input
          type="text"
          placeholder="which channel do you want to notify? e.g: #dev-frontend"
        />
      </label>
    </form>
    <Button :onClick="handleSubmit">新增訂單</Button>
  </div>
</template>

<script>
import Button from '@/components/Button';
import { getDrinkShops, createMenu } from '@/api';
import formDataToJSON from '@/utils/formDataToJSON';

export default {
  components: {
    Button,
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
        this.errors.push(['請填寫時間、名稱、及飲料店家']);
        return;
      }

      createMenu(formDataToJSON(new FormData(this.$refs.menu))).subscribe(
        result => {
          console.log(result);
          this.$refs.menu.reset();
          this.$router.push({ path: '/menu' });
        }
      );
    },
  },
};
</script>
