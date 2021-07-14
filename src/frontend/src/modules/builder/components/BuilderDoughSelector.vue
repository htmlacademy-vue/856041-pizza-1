<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <base-radio-selector
          v-for="el in doughs"
          :modelValue="getModelValue"
          @change="selectDough(el)"
          :key="el.name"
          :value="el.value"
        >
          <img :src="el.image" width="36" height="36" />
          <div>
            <b class="dough-input__title">{{ el.name }}</b>
            <span class="dough-input__description">{{ el.description }}</span>
          </div>
        </base-radio-selector>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import { SET_PIZZA_PARAM } from "@/store/mutations-types";
import BaseRadioSelector from "@/common/components/BaseRadioSelector.vue";

export default {
  name: "BuilderDoughSelector",

  components: {
    BaseRadioSelector,
  },

  computed: {
    doughs() {
      return this.$store.state.Builder.data.doughs;
    },

    selectedDough() {
      return this.$store.state.Builder.pizza.dough;
    },

    getModelValue() {
      return this.selectedDough && this.selectedDough.value;
    },
  },

  methods: {
    ...mapMutations("Builder", {
      setPizzaParam: SET_PIZZA_PARAM,
    }),

    selectDough(dough) {
      this.setPizzaParam({ param: "dough", value: dough });
    },
  },
};
</script>
