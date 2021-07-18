<template>
  <div class="content__constructor">
    <base-drop @drop="addIngredient">
      <div :class="getPizzaFoundationClasses">
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in filledIngredients"
            :key="ingredient.value"
            :class="getIngredientClasses(ingredient)"
          ></div>
        </div>
      </div>
    </base-drop>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import { UPDATE_PIZZA_INGREDIENT } from "@/store/mutations-types";

import BaseDrop from "@/common/components/BaseDrop.vue";

export default {
  name: "BuilderPizzaView",

  components: {
    BaseDrop,
  },

  computed: {
    ...mapGetters("Builder", ["filledIngredients"]),

    pizza() {
      return this.$store.state.Builder.pizza;
    },

    getPizzaFoundationClasses() {
      const { sauce, dough } = this.pizza;
      if (sauce && dough) {
        return ["pizza", `pizza--foundation--${dough.value}-${sauce.value}`];
      } else {
        return "pizza";
      }
    },
  },

  methods: {
    ...mapMutations("Builder", {
      updatePizzaIngredient: UPDATE_PIZZA_INGREDIENT,
    }),

    addIngredient({ name }) {
      this.updatePizzaIngredient({
        name: name,
        type: "increment",
      });
    },

    getIngredientClasses({ count, value }) {
      const getMultiplyClass = (count) => {
        switch (count) {
          case 2:
            return "pizza__filling--second";

          case 3:
            return "pizza__filling--third";

          default:
            return "";
        }
      };
      return [
        "pizza__filling",
        `pizza__filling--${value}`,
        `${getMultiplyClass(count)}`,
      ];
    },
  },
};
</script>
