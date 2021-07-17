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
          <li>{{ pizza.size.name }}, на {{ getDough }} тесте</li>
          <li>Соус: {{ pizza.sauce.name.toLowerCase() }}</li>
          <li>Начинка: {{ filledIngredients }}</li>
        </ul>
      </div>
    </div>

    <base-item-counter class="cart-list__counter" v-model="counter" />

    <div class="cart-list__price">
      <b>{{ getPizzaPrice }} ₽</b>
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
import { mapMutations } from "vuex";
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
    getDough() {
      return this.pizza.dough.value === "big" ? "толстом" : "тонком";
    },

    filledIngredients() {
      return this.pizza.ingredients
        .filter((el) => el.count > 0)
        .map((el) => el.name.toLowerCase())
        .join(", ");
    },

    getPizzaPrice() {
      return this.pizza.price * this.pizza.count;
    },

    counter: {
      get() {
        return this.pizza.count;
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
              count: val,
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
