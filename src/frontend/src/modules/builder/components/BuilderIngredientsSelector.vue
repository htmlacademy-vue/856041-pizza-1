<template>
  <div class="content__ingridients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингридиенты</h2>

      <div class="sheet__content ingridients">
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
              :value="getSauceValue(sauce)"
              @change="$emit('selectSauce', $event.target.value)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingridients__filling">
          <p>Начинка:</p>

          <ul class="ingridients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.name"
              class="ingridients__item"
            >
              <span :class="`filling filling--${ingredient.value}`">{{
                ingredient.name
              }}</span>

              <base-item-counter
                :value="ingredient.count"
                @change="changeIngredientCount($event, ingredient)"
                class="ingridients__counter"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseItemCounter from "@/common/components/BaseItemCounter.vue";

export default {
  name: "BuilderIngredientsSelector",

  components: {
    BaseItemCounter,
  },

  props: {
    sauces: {
      type: Array,
      required: true,
    },

    ingredients: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    changeIngredientCount(count, { value }) {
      console.log(count, value);
    },

    getSauceValue({ name }) {
      switch (name) {
        case "Томатный":
          return "tomato";
        case "Сливочный":
          return "creamy";
        default:
          return "tomato";
      }
    },
  },
};
</script>
