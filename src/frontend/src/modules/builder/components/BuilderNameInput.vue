<template>
  <base-input
    v-model="name"
    name="pizza_name"
    placeholder="Введите название пиццы"
  >
    <span class="visually-hidden">Название пиццы</span>
  </base-input>
</template>

<script>
import BaseInput from "@/common/components/BaseInput.vue";

export default {
  name: "BuilderNameInput",

  components: {
    BaseInput,
  },

  model: {
    prop: "value",
    change: "change",
  },

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  computed: {
    name: {
      get() {
        return this.value;
      },
      set(val) {
        return this.$emit("change", val);
      },
    },
  },
};
</script>
