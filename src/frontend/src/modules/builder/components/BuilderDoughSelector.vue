<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <base-radio-selector
          v-for="el in doughs"
          :modelValue="getModelValue"
          @change="$emit('selectDough', el)"
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
import BaseRadioSelector from "@/common/components/BaseRadioSelector.vue";

export default {
  name: "BuilderDoughSelector",

  components: {
    BaseRadioSelector,
  },

  props: {
    doughs: {
      type: Array,
      required: true,
    },

    selectedDough: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    getModelValue() {
      return this.selectedDough && this.selectedDough.value;
    },
  },
};
</script>
