<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select v-model="deliveryType" class="select">
          <option value="pickup">Заберу сам</option>
          <option value="delivery">Новый адрес</option>
          <!-- <option value="3">Дом</option> -->
        </select>
      </label>

      <base-input
        class="input--big-label"
        v-model="phone"
        placeholder="+7 999-999-99-99"
      >
        <span>Контактный телефон:</span>
      </base-input>

      <div class="cart-form__address" v-if="deliveryType !== 'pickup'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <base-input v-model="street" required>
            <span>Улица*</span>
          </base-input>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <base-input v-model="house" required>
            <span>Дом*</span>
          </base-input>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <base-input v-model="flat">
            <span>Квартира</span>
          </base-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_DELIVERY_PARAM } from "@/store/mutations-types";
import { mapMutations } from "vuex";
import BaseInput from "@/common/components/BaseInput.vue";

export default {
  name: "CartForm",

  components: {
    BaseInput,
  },

  computed: {
    deliveryType: {
      get() {
        return this.$store.state.Cart.delivery.type;
      },
      set(val) {
        this.setDeliveryParam({ param: "type", value: val });
      },
    },

    street: {
      get() {
        return this.$store.state.Cart.delivery.street;
      },
      set(val) {
        this.setDeliveryParam({ param: "street", value: val });
      },
    },

    house: {
      get() {
        return this.$store.state.Cart.delivery.house;
      },
      set(val) {
        this.setDeliveryParam({ param: "house", value: val });
      },
    },

    flat: {
      get() {
        return this.$store.state.Cart.delivery.flat;
      },
      set(val) {
        this.setDeliveryParam({ param: "flat", value: val });
      },
    },

    phone: {
      get() {
        return this.$store.state.Cart.delivery.phone;
      },
      set(val) {
        this.setDeliveryParam({ param: "phone", value: val });
      },
    },
  },

  methods: {
    ...mapMutations("Cart", {
      setDeliveryParam: SET_DELIVERY_PARAM,
    }),
  },
};
</script>
