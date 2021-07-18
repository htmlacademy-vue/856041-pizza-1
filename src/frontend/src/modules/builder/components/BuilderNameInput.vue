<template>
  <base-input v-model="name" placeholder="Введите название пиццы">
    <span class="visually-hidden">Название пиццы</span>
  </base-input>
</template>

<script>
import { mapMutations } from "vuex";

import { SET_PIZZA_PARAM } from "@/store/mutations-types";

import BaseInput from "@/common/components/BaseInput.vue";

export default {
  name: "BuilderNameInput",

  components: {
    BaseInput,
  },

  computed: {
    name: {
      get() {
        return this.$store.state.Builder.pizza.name;
      },

      set(val) {
        this.setPizzaParam({ param: "name", value: val });
      },
    },
  },

  methods: {
    ...mapMutations("Builder", {
      setPizzaParam: SET_PIZZA_PARAM,
    }),
  },
};
</script>
