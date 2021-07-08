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
          :ingredients="pizza.ingredients"
          :selectedSauce="pizza.sauce"
          @selectSauce="selectSauce"
          @selectIngredient="selectIngredients"
        />

        <div class="content__pizza">
          <builder-name-input v-model="pizza.name"></builder-name-input>

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
import {
  prepareDoughs,
  prepareIngredients,
  prepareSauces,
  prepareSizes,
} from "@/common/helpers.js";

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
      dough: prepareDoughs(pizza.dough),
      ingredients: pizza.ingredients,
      sauces: prepareSauces(pizza.sauces),
      sizes: prepareSizes(pizza.sizes),

      pizza: {
        dough: undefined,
        ingredients: [],
        name: "",
        sauce: undefined,
        size: undefined,
      },
    };
  },

  computed: {
    filledIngredients() {
      return this.pizza.ingredients.filter((el) => el.count > 0);
    },
  },

  mounted() {
    this.resetPizza();
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
      const ingredient = { ...this.pizza.ingredients[index], count };

      this.pizza.ingredients.splice(index, 1, ingredient);
    },

    addIngredient(ingredient) {
      const index = this.pizza.ingredients.findIndex(
        (el) => ingredient.name === el.name
      );
      const count = ingredient.count + 1;

      this.selectIngredients(count, index);
    },

    resetPizza() {
      this.pizza.dough = this.dough[0];
      this.pizza.sauce = this.sauces[0];
      this.pizza.size = this.sizes[0];
      this.pizza.name = "";
      this.pizza.ingredients = prepareIngredients(this.ingredients);
    },
  },
};
</script>
