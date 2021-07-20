<template>
  <main class="content">
    <form action="#" method="post" @submit.prevent="handleSubmit">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <builder-dough-selector />

        <builder-size-selector />

        <builder-ingredients-selector />

        <div class="content__pizza">
          <builder-name-input />

          <builder-pizza-view />

          <builder-price-counter />
        </div>
      </div>
    </form>

    <router-view />
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector.vue";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector.vue";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector.vue";
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView.vue";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter.vue";
import BuilderNameInput from "@/modules/builder/components/BuilderNameInput.vue";
import { mapActions } from "vuex";

export default {
  name: "IndexMain",

  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
    BuilderPriceCounter,
    BuilderNameInput,
  },

  methods: {
    ...mapActions("Builder", ["post"]),

    handleSubmit() {
      this.post();
    },
  },
};
</script>
