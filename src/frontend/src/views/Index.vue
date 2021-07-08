<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <builder-dough-selector
          :doughs="dough"
          :selectedDough="pizza.dough"
          @selectDough="selectDough"
        />

        <builder-size-selector
          :sizes="sizes"
          :selectedSize="pizza.size"
          @selectSize="selectSize"
        />

        <builder-ingredients-selector
          :sauces="sauces"
          :ingredients="ingredients"
          :selectedSauce="pizza.sauce"
          :selectedIngredients="pizza.ingredients"
          @selectSauce="selectSauce"
          @selectIngredient="selectIngredients"
        />

        <div class="content__pizza">
          <builder-name-input v-model="name"></builder-name-input>

          <builder-pizza-view
            :pizza="pizza"
            :ingredients="filledIngredients"
            @addIngredient="addIngredient"
          ></builder-pizza-view>

          <builder-price-counter></builder-price-counter>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import { prepareIngredients } from "@/common/helpers.js";

import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import BuilderNameInput from "@/modules/builder/components/BuilderNameInput.vue";

export default {
  name: "IndexMain",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderNameInput,
  },

  data() {
    return {
      dough: pizza.dough,
      ingredients: prepareIngredients(pizza.ingredients),
      sauces: pizza.sauces,
      sizes: pizza.sizes,
      name: "",
      pizza: {
        dough: "small",
        ingredients: [],
        sauce: "creamy",
        size: "",
      },
    };
  },

  computed: {
    filledIngredients() {
      return this.ingredients.filter((el) => el.count > 0);
    },
  },

  methods: {
    selectDough(val) {
      this.pizza.dough = val;
    },

    selectSize(val) {
      this.pizza.size = val;
    },

    selectSauce(val) {
      this.pizza.sauce = val;
    },

    selectIngredients(count, index) {
      const ingredient = { ...this.ingredients[index], count };

      this.ingredients.splice(index, 1, ingredient);
      // TODO
    },

    addIngredient(ingredient) {
      const index = this.ingredients.findIndex(
        (el) => ingredient.name === el.name
      );
      const count = ingredient.count + 1;

      this.selectIngredients(count, index);
    },
  },
};
</script>
