<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select v-model="deliveryType" class="select">
          <option value="pickup">Заберу сам</option>
          <option value="delivery">Новый адрес</option>
          <option
            v-for="address in addresses"
            :key="address.id"
            :value="address.id"
          >
            {{ address.name }}
          </option>
        </select>
      </label>

      <base-input
        v-mask="'+7 ###-###-##-##'"
        class="input--big-label"
        v-model="phone"
        placeholder="+7 999-999-99-99"
        type="tel"
        pattern="^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$"
        required
      >
        <span>Контактный телефон:</span>
      </base-input>

      <div class="cart-form__address" v-if="deliveryType !== 'pickup'">
        <span class="cart-form__label">Новый адрес:</span>

        <div class="cart-form__input">
          <base-input v-model="street" required :disabled="isExistingAddress">
            <span>Улица*</span>
          </base-input>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <base-input v-model="building" required :disabled="isExistingAddress">
            <span>Дом*</span>
          </base-input>
        </div>

        <div class="cart-form__input cart-form__input--small">
          <base-input v-model="flat" :disabled="isExistingAddress">
            <span>Квартира</span>
          </base-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_DELIVERY_PARAM, RESET_DELIVERY } from "@/store/mutations-types";
import { mapMutations, mapState } from "vuex";
import BaseInput from "@/common/components/BaseInput.vue";

export default {
  name: "CartForm",

  components: {
    BaseInput,
  },

  computed: {
    ...mapState("Auth", ["addresses"]),

    isExistingAddress() {
      return this.deliveryType === "address";
    },

    deliveryType: {
      get() {
        return this.$store.state.Cart.delivery.type;
      },
      set(val) {
        if (typeof val == "number") {
          // console.log("eto address");
          this.setDeliveryAddress(val);
          this.setDeliveryParam({ param: "type", value: "address" });
        } else {
          if (val === "delivery") {
            this.resetDelivery();
          }
          this.setDeliveryParam({ param: "type", value: val });
        }
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

    building: {
      get() {
        return this.$store.state.Cart.delivery.building;
      },
      set(val) {
        this.setDeliveryParam({ param: "building", value: val });
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
      resetDelivery: RESET_DELIVERY,
    }),

    setDeliveryAddress(id) {
      const address = this.addresses.find((el) => el.id === id);

      this.resetDelivery();
      for (const [key, value] of Object.entries(address)) {
        this.setDeliveryParam({ param: key, value });
      }
    },
  },
};
</script>
