<template>
  <section class="sheet order">
    <div class="order__wrapper">
      <div class="order__number">
        <b>Заказ #{{ order.id }}</b>
      </div>

      <div class="order__sum">
        <span>Сумма заказа: {{ getOrderPrice(order) }} ₽</span>
      </div>

      <div class="order__button">
        <button
          type="button"
          class="button button--border"
          @click="deleteOrder(order.id)"
        >
          Удалить
        </button>
      </div>
      <div class="order__button">
        <button type="button" class="button">Повторить</button>
      </div>
    </div>

    <ul class="order__list">
      <profile-order-item-pizza
        v-for="pizza in order.orderPizzas"
        :pizza="pizza"
        :key="pizza.id"
      />
    </ul>

    <ul class="order__additional">
      <profile-order-item-misc
        v-for="misc in order.orderMisc"
        :misc="misc"
        :key="misc.id"
      />
    </ul>

    <p class="order__address" v-if="addressName">
      Адрес доставки: {{ addressName }}
    </p>
  </section>
</template>

<script>
import ProfileOrderItemPizza from "@/modules/profile/components/ProfileOrderItemPizza.vue";
import ProfileOrderItemMisc from "@/modules/profile/components/ProfileOrderItemMisc.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ProfileOrderItem",

  components: {
    ProfileOrderItemPizza,
    ProfileOrderItemMisc,
  },

  props: {
    order: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Orders", ["getOrderPrice"]),
    ...mapGetters("Auth", ["getAddressByID"]),

    addressName() {
      const { addressId } = this.order;
      if (addressId) {
        const { name } = this.getAddressByID(addressId);
        return name;
      } else {
        return "";
      }
    },
  },

  methods: {
    ...mapActions("Orders", ["deleteOrder"]),
  },
};
</script>
