<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <base-radio-selector
          v-for="size in sizes"
          :key="size.multiplier"
          :modelValue="getModelValue"
          :value="size.value"
          @change="selectSize(size)"
        >
          <div
            class="image-wrapper"
            :class="getDiameterImageClasses(size.value)"
          ></div>
          <span>{{ size.name }}</span>
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
  name: "BuilderSizeSelector",

  components: {
    BaseRadioSelector,
  },

  computed: {
    sizes() {
      return this.$store.state.Builder.data.sizes;
    },

    selectedSize() {
      return this.$store.state.Builder.pizza.size;
    },

    getModelValue() {
      return this.selectedSize && this.selectedSize.value;
    },
  },

  methods: {
    ...mapMutations("Builder", {
      setPizzaParam: SET_PIZZA_PARAM,
    }),

    selectSize(size) {
      this.setPizzaParam({ param: "size", value: size });
    },

    getDiameterImageClasses(value) {
      return [
        "diameter-input__image-wrapper",
        `diameter-input__image-wrapper--${value}`,
      ];
    },
  },
};
</script>
