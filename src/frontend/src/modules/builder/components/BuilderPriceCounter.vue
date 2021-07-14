<template>
  <div class="content__result">
    <p>Итого: {{ pizzaPrice }} ₽</p>
    <BaseButton :disabled="!isPizzaReady"> Готовьте! </BaseButton>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import BaseButton from "@/common/components/BaseButton.vue";

export default {
  name: "BuilderPriceCounter",

  components: {
    BaseButton,
  },

  computed: {
    ...mapGetters("Builder", ["pizzaPrice", "isPizzaReady"]),
  },
};
</script>
