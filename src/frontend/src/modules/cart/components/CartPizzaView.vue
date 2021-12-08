<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="pizza.name"
      />
      <div class="product__text">
        <h2>{{ pizza.name }}</h2>
        <ul>
          <li>{{ pizzaSizeName }}, на {{ pizzaDoughName }} тесте</li>
          <li>Соус: {{ pizzaSauceName }}</li>
          <li>Начинка: {{ filledIngredients }}</li>
        </ul>
      </div>
    </div>

    <base-item-counter class="cart-list__counter" v-model="counter" />

    <div class="cart-list__price">
      <b>{{ pizzaPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button type="button" @click="changePizza" class="cart-list__edit">
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import BaseItemCounter from "@/common/components/BaseItemCounter.vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import {
  UPDATE_ENTITY,
  DELETE_ENTITY,
  UPDATE_READY_PIZZA,
} from "@/store/mutations-types";

export default {
  name: "CartPizzaView",

  components: {
    BaseItemCounter,
  },

  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("Builder", {
      builderData: "data",
    }),

    ...mapGetters(["getPizzaPrice"]),

    pizzaDoughName() {
      const { pizza, builderData } = this;
      const { name } = builderData.doughs.find((el) => el.id === pizza.doughId);
      return name.toLowerCase().replace(/.$/, "м");
    },

    pizzaSauceName() {
      const { pizza, builderData } = this;
      const { name } = builderData.sauces.find((el) => el.id === pizza.sauceId);
      return name;
    },

    pizzaSizeName() {
      const { pizza, builderData } = this;
      const { name } = builderData.sizes.find((el) => el.id === pizza.sizeId);
      return name;
    },

    filledIngredients() {
      const { pizza, builderData } = this;
      return pizza.ingredients
        .map((el) => {
          const { name } = builderData.ingredients.find(
            (ingredient) => ingredient.id === el.id
          );
          return name.toLowerCase();
        })
        .join(", ");
    },

    pizzaPrice() {
      const { pizza, getPizzaPrice } = this;
      const price = getPizzaPrice(pizza);
      return price * pizza.quantity;
    },

    counter: {
      get() {
        return this.pizza.quantity;
      },
      set(val) {
        if (val === 0) {
          this.deleteEntity({
            module: "Cart",
            entity: "pizzas",
            id: this.pizza.id,
          });
        } else {
          this.updateEntity({
            module: "Cart",
            entity: "pizzas",
            value: {
              ...this.pizza,
              quantity: val,
            },
          });
        }
      },
    },
  },

  methods: {
    ...mapMutations({
      updateEntity: UPDATE_ENTITY,
      deleteEntity: DELETE_ENTITY,
    }),

    ...mapMutations("Builder", {
      updateReadyPizza: UPDATE_READY_PIZZA,
    }),

    changePizza() {
      this.updateReadyPizza(this.pizza);
      this.$router.push("/");
    },
  },
};
</script>
