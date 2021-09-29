<template>
  <li class="order__item">
    <!-- TODO: Вынести product в отдельный компонент -->
    <div class="product">
      <img
        src="@/assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="formattedPizza.name"
      />

      <div class="product__text">
        <h2>{{ formattedPizza.name }}</h2>
        <ul>
          <li>{{ formattedPizza.size.name }}, на {{ getDough }} тесте</li>
          <li>Соус: {{ formattedPizza.sauce.name.toLowerCase() }}</li>
          <li>Начинка: {{ filledIngredients }}</li>
        </ul>
      </div>
    </div>

    <p class="order__price">
      {{ formattedPizza.quantity > 1 ? `${formattedPizza.quantity}x` : "" }}
      {{ getPizzaPrice(pizza) }}
      ₽
    </p>
  </li>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ProfileOrderItemPizza",

  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters("Orders", ["getFormattedPizza", "getPizzaPrice"]),

    formattedPizza() {
      return this.getFormattedPizza(this.pizza);
    },

    getDough() {
      return this.formattedPizza.dough.value === "big" ? "толстом" : "тонком";
    },

    filledIngredients() {
      return this.formattedPizza.ingredients
        .map((el) => el.name.toLowerCase())
        .join(", ");
    },
  },
};
</script>
