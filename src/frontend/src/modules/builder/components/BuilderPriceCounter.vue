<template>
  <div class="content__result">
    <p>Итого: {{ price }} ₽</p>
    <BaseButton :disabled="disabled"> Готовьте! </BaseButton>
  </div>
</template>

<script>
import BaseButton from "@/common/components/BaseButton.vue";

export default {
  name: "BuilderPriceCounter",

  components: {
    BaseButton,
  },

  props: {
    price: {
      type: Number,
      required: true,
    },

    disabled: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
