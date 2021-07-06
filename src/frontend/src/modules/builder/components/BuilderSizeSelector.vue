<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <BaseRadioSelector
          v-for="size in sizes"
          :key="size.multiplier"
          :modelValue="selectedSize"
          :value="getSizesValue(size)"
          @change="selectSize"
        >
          <div
            class="image-wrapper"
            :class="getDiameterImageClasses(getSizesValue(size))"
          ></div>
          <span>{{ size.name }}</span>
        </BaseRadioSelector>
      </div>
    </div>
  </div>
</template>

<script>
import BaseRadioSelector from "@/common/components/BaseRadioSelector.vue";

export default {
  name: "BuilderSizeSelector",

  components: {
    BaseRadioSelector,
  },

  props: {
    sizes: {
      type: Array,
      required: true,
    },

    selectedSize: {
      type: String,
      required: true,
    },
  },

  methods: {
    getSizesValue({ name }) {
      switch (name) {
        case "23 см":
          return "small";
        case "32 см":
          return "normal";
        case "45 см":
          return "big";
        default:
          return "big";
      }
    },

    getDiameterImageClasses(value) {
      return [
        "diameter-input__image-wrapper",
        `diameter-input__image-wrapper--${value}`,
      ];
    },

    selectSize(val) {
      this.$emit("selectSize", val);
    },
  },
};
</script>
