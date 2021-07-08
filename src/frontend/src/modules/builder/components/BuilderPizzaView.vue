<template>
  <div class="content__constructor">
    <base-drop @drop="$emit('addIngredient', $event)">
      <div :class="getPizzaFoundationClasses">
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in ingredients"
            :key="ingredient.value"
            :class="getIngredientClasses(ingredient)"
          ></div>
        </div>
      </div>
    </base-drop>
  </div>
</template>

<script>
import BaseDrop from "@/common/components/BaseDrop.vue";

export default {
  name: "BuilderPizzaView",

  components: {
    BaseDrop,
  },

  props: {
    pizza: {
      type: Object,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },
  },

  computed: {
    getPizzaFoundationClasses() {
      const { sauce, dough } = this.pizza;
      return ["pizza", `pizza--foundation--${dough}-${sauce}`];
    },
  },

  methods: {
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
