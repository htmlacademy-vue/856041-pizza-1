<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingridients">
        <builder-sauce-selector />

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.name"
              class="ingridients__item"
            >
              <base-drag
                :draggable="isDragAvailable(ingredient)"
                :transfer-data="ingredient"
              >
                <span :class="`filling filling--${ingredient.value}`">{{
                  ingredient.name
                }}</span>
              </base-drag>

              <base-item-counter
                :value="ingredient.count"
                :maxCount="3"
                @change="editIngredient($event, ingredient)"
                class="ingridients__counter"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector.vue";
import BaseItemCounter from "@/common/components/BaseItemCounter.vue";
import BaseDrag from "@/common/components/BaseDrag.vue";

import { MAX_INGREDIENTS_COUNT } from "@/common/constants.js";
import { UPDATE_PIZZA_INGREDIENT } from "@/store/mutations-types";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    BuilderSauceSelector,
    BaseItemCounter,
    BaseDrag,
  },

  computed: {
    ingredients() {
      return this.$store.state.Builder.pizza.ingredients;
    },
  },

  methods: {
    ...mapMutations("Builder", {
      updatePizzaIngredient: UPDATE_PIZZA_INGREDIENT,
    }),

    isDragAvailable({ count }) {
      return count < MAX_INGREDIENTS_COUNT;
    },

    editIngredient(count, ingredient) {
      this.updatePizzaIngredient({
        name: ingredient.name,
        type: count > ingredient.count ? "increment" : "decrement",
      });
    },
  },
};
</script>
