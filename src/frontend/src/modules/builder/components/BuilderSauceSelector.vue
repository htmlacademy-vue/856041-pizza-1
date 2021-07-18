<template>
  <div class="ingridients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="sauce in sauces"
      :key="sauce.name"
      class="radio ingridients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="sauce.value"
        :checked="getModelValue(sauce)"
        @change="selectSauce(sauce)"
      />
      <span>{{ sauce.name }}</span>
    </label>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import { SET_PIZZA_PARAM } from "@/store/mutations-types";

export default {
  name: "BuilderSauceSelector",

  computed: {
    sauces() {
      return this.$store.state.Builder.data.sauces;
    },

    selectedSauce() {
      return this.$store.state.Builder.pizza.sauce;
    },
  },

  methods: {
    ...mapMutations("Builder", {
      setPizzaParam: SET_PIZZA_PARAM,
    }),

    selectSauce(sauce) {
      this.setPizzaParam({ param: "sauce", value: sauce });
    },

    getModelValue({ value }) {
      return value === this.selectedSauce?.value;
    },
  },
};
</script>
