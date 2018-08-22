<template>
  <ModalBody @close-modal="closeModal">
    <h2>{{ menu.drink_shop.name }}</h2>
    <ul>
      <li>杯數：{{ menu.orders && menu.orders.length  }}</li>
      <li>總計：{{ menu.sum }}</li>
    </ul>
    <img v-if="menu" :src="menu.drink_shop.image_url" alt="">
    <div class="menu-info">
      <h3>
        <Avatar :src="menu.user.picture" :size="40" />
        由 {{ menu.user.username }} 所發起的 {{ menu.name }}
      </h3>
      <Countdown :endTime="new Date(menu.end_time)" />
    </div>
    <div class="orders">
      <form id="editOrder" ref="editOrderForm">
        <Table
          :config="config"
          :data="menu.orders"
        >
          <template slot="action" slot-scope="action">
            <Button
              v-show="action.data.user.id === info.id"
              :onClick="() => handleClick(action.data.id)"
            >{{ isEditing ? '確認' : '修改' }}</Button>
          </template>
          <template slot="name" slot-scope="name">
            <input
              name="name"
              v-if="isEditing && isMine(name.data) && name.data.id === editOrderID"
              type="text"
              :value="name.data.name"
              required
            />
            <span v-else>{{ name.data.name }}</span>
          </template>
          <template slot="price" slot-scope="price">
            <input
              required
              name="price"
              v-if="isEditing && isMine(price.data) && price.data.id === editOrderID"
              type="number"
              :value="price.data.price"
            />
            <span v-else>{{ price.data.price }}</span>
          </template>
          <template slot="note" slot-scope="note">
            <input
              v-if="isEditing && isMine(note.data) && note.data.id === editOrderID"
              type="text"
              name="note"
              :value="note.data.note"
            />
            <span v-else>{{ note.data.note }}</span>
          </template>
        </Table>
      </form>
    </div>
    <h3
      class="has-ended"
      v-show="isEnded">已截止</h3>
    <form ref="orderForm" name="order" v-show="!isEnded" class="orderForm">
      <InputGroup
        name="orderName"
        type="text"
        label="飲料名稱"
        required
        :value="name"
        :disabled="loading"
        @input="e => name = e.target.value"
      >
        <div class="size-options">
          <span
            class="tag"
            v-for="size in sizes"
            :key="size"
            @click="changeSize(size)"
          >{{ size }}</span>
        </div>
      </InputGroup>
      <InputGroup
        name="orderPrice"
        label="價格"
        type="number"
        :disabled="loading"
        :min="15"
        :step="5"
        :value="price"
        required
        @input="e => price = parseInt(e.target.value)"
      >
        <div class="price-options">
          <span
            class="tag"
            v-for="price in prices"
            :key="price"
            @click="changePrice(price)"
          >${{ price }}</span>
        </div>
      </InputGroup>
      <InputGroup
        name="orderNote"
        label="備註"
        type="text"
        :value="note"
        :disabled="loading"
        @input="e => note = e.target.value"
      >
        <div class="note-options">
          <label>甜度</label>
          <span
            class="tag"
            v-for="suger in sugers"
            :key="suger"
            @click="changeSuger(suger)"
          >{{ suger }}</span>
          <label>冰塊</label>
          <span
            class="tag"
            v-for="ice in ices"
            :key="ice"
            @click="changeIce(ice)"
          >{{ ice }}</span>
        </div>
      </InputGroup>
    </form>
    <Button
      :onClick="handleSubmit"
      v-if="!isEnded">
      新增訂單
    </Button>
  </ModalBody>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Avatar from '@/components/Avatar';
import Table from '@/components/Table';
import Button from '@/components/Button';
import Countdown from '@/components/Countdown';
import InputGroup from '@/components/Input/InputGroup';
import formDataToJSON from '@/utils/formDataToJSON';
import ModalBody from '../ModalBody';

const prices = [30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80];
const sizes = ['S', 'M', 'L'];
const sugers = ['無糖', '微糖', '少糖', '半糖', '正常'];
const ices = ['去冰', '少冰', '多冰', '正常冰'];

export default {
  components: {
    ModalBody,
    Table,
    Button,
    Countdown,
    Avatar,
    InputGroup,
  },
  data: () => ({
    size: '',
    suger: '',
    ice: '',
    price: 10,
    note: '',
    drinkName: '',
    editOrderID: null,
    isEditing: false,
  }),
  computed: {
    ...mapState('modal', ['params']),
    ...mapState('user', ['info']),
    ...mapState('menus', ['list', 'loading']),
    isEnded() {
      return new Date(this.menu.end_time) < new Date();
    },
    config() {
      return {
        'user.username': { title: '姓名', align: 'center' },
        'user.picture': { title: '', type: 'image', align: 'center' },
        name: { title: '飲料名稱', align: 'center', custom: true },
        price: { title: '價格', align: 'right', custom: true },
        note: { title: '備註', custom: true },
        action: {
          title: '',
          custom: true,
        },
      };
    },
    menu() {
      const menu = this.list.find(m => m.id === this.params.menuID);
      return menu;
    },
    sizes: () => sizes,
    sugers: () => sugers,
    ices: () => ices,
    prices: () => prices,
    name: {
      get() {
        if (this.size) {
          return `${this.drinkName} ${this.size}`;
        }
        return this.drinkName;
      },
      set(name) {
        this.size = '';
        this.drinkName = name;
      },
    },
  },
  methods: {
    ...mapActions('modal', ['closeModal']),
    ...mapActions('menus', ['createOrder', 'updateOrder']),
    isMine(data) {
      return data.user.id === this.info.id;
    },
    handleSubmit() {
      if (this.$refs.orderForm.checkValidity()) {
        const data = formDataToJSON(new FormData(this.$refs.orderForm), [
          'orderPrice',
        ]);
        this.createOrder({
          menuID: this.params.menuID,
          name: data.orderName,
          price: data.orderPrice,
          note: data.orderNote,
        });

        this.$refs.orderForm.reset();
      }
    },
    handleClick(orderID) {
      if (!this.isEditing && !this.editOrderID) {
        this.isEditing = true;
        this.editOrderID = orderID;
      } else if (this.isEditing && this.editOrderID !== orderID) {
        this.isEditing = true;
        this.editOrderID = orderID;
      } else if (this.isEditing && this.editOrderID === orderID) {
        const data = new FormData(this.$refs.editOrderForm);
        this.updateOrder({
          ...formDataToJSON(data, ['price']),
          menuID: this.params.menuID,
          orderID,
        });
        this.isEditing = false;
        this.editOrderID = null;
      }
    },
    changeSize(size) {
      this.size = size;
    },
    changePrice(price) {
      this.price = price;
    },
    changeIce(ice) {
      this.ice = ice;
      this.note = `${this.suger}${ice}`;
    },
    changeSuger(suger) {
      this.suger = suger;
      this.note = `${suger}${this.ice}`;
    },
  },
};
</script>

<style scoped>
.tag {
  font-size: 12px;
  padding: 3px 16px;
  text-align: center;
  color: #444;
  background-color: rgba(200, 200, 200, 0.5);
  cursor: pointer;
  line-height: 1;
  border-radius: 4px;
}

.tag:hover {
  opacity: 0.8;
}

.tag:not(:last-child) {
  margin-right: 8px;
}

.menu-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.has-ended {
  text-align: center;
}

[class*='-options'] {
  margin-top: 0.3em;
}

.orderForm {
  margin-bottom: 1em;
}
</style>
