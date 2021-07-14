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
              v-for="(ingredient, index) in ingredients"
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
                @change="$emit('selectIngredient', $event, index)"
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
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector.vue";
import BaseItemCounter from "@/common/components/BaseItemCounter.vue";
import BaseDrag from "@/common/components/BaseDrag.vue";

import { MAX_INGREDIENTS_COUNT } from "@/common/constants.js";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    BuilderSauceSelector,
    BaseItemCounter,
    BaseDrag,
  },

  props: {
    sauces: {
      type: Array,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },

    selectedSauce: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    isDragAvailable({ count }) {
      return count < MAX_INGREDIENTS_COUNT;
    },

    getModelValue({ value }) {
      return value === this.selectedSauce?.value;
    },
  },
};
</script>
