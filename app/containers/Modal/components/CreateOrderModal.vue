<template>
  <ModalBody @close-modal="closeModal">
    <img v-if="menu" :src="menu.drink_shop.image_url" alt="">
    <div class="orders">
      <form>
      <Table
        :config="config"
        :data="menu.orders"
      >
        <template slot="action" slot-scope="action">
          <Button
            v-show="action.data.user.id === info.id"
            :onClick="handleClick"
          >{{ isEditing ? '確認' : '修改' }}</Button>
        </template>
        <template slot="name" slot-scope="name">
          <input v-if="isEditing && isMine(name.data)" type="text" :value="name.data.name" />
          <span v-else>{{ name.data.name }}</span>
        </template>
        <template slot="price" slot-scope="price">
          <input v-if="isEditing && isMine(price.data)" type="number" :value="price.data.price" />
          <span v-else>{{ price.data.price }}</span>
        </template>
        <template slot="note" slot-scope="note">
          <input v-if="isEditing && isMine(note.data)" type="text" :value="note.data.note" />
          <span v-else>{{ note.data.note }}</span>
        </template>
      </Table>
      </form>
    </div>
    <form name="order">
      <div>
        <label for="orderName">飲料名稱</label>
        <input id="orderName" type="text" v-model="name">
        <div class="size-options">
          <span
            class="tag"
            v-for="size in sizes"
            :key="size"
            @click="changeSize(size)"
          >{{ size }}</span>
        </div>
      </div>
      <div>
        <label for="orderPrice">價格</label>
        <input id="orderPrice" type="number" v-model.number="price">
        <div class="price-options">
          <span
            class="tag"
            v-for="price in prices"
            :key="price"
            @click="changePrice(price)"
          >${{ price }}</span>
        </div>
      </div>
      <div>
        <label for="orderNote">備註</label>
        <input id="orderNote" type="text" v-model="note" />
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
      </div>
    </form>    
  </ModalBody>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Table from '@/components/Table';
import Button from '@/components/Button';
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
  },
  data: () => ({
    size: '',
    suger: '',
    ice: '',
    price: 10,
    note: '',
    drinkName: '',
    isEditing: false,
  }),
  computed: {
    ...mapState('modal', ['params']),
    ...mapState('user', ['info']),
    config() {
      const userID = this.info.id;
      return {
        'user.username': { title: '姓名', align: 'center' },
        'user.picture': { title: '照片', type: 'image', align: 'center' },
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
      const menu = this.$store.state.menus.list.find(
        m => m.id === this.params.menuID
      );
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
    isMine(data) {
      return data.user.id === this.info.id;
    },
    handleClick() {
      this.isEditing = !this.isEditing;
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
</style>
