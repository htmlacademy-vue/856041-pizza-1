<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <BaseRadioSelector
                v-for="el in dough"
                v-model="selectedDough"
                :key="el.name"
                :value="getDoughValue(el)"
              >
                <img :src="el.image" width="36" height="36" />
                <div>
                  <b class="dough-input__title">{{ el.name }}</b>
                  <span class="dough-input__description">{{
                    el.description
                  }}</span>
                </div>
              </BaseRadioSelector>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <BaseRadioSelector
                v-for="size in sizes"
                v-model="selectedSize"
                :key="size.multiplier"
                :value="getSizesValue(size)"
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

        <div class="content__ingridients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингридиенты
            </h2>

            <div class="sheet__content ingridients">
              <div class="ingridients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="sauce in sauces"
                  :key="sauce.name"
                  class="radio ingridients__input"
                >
                  <input type="radio" name="sauce" :value="sauce.name" />
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
                    <span
                      :class="`filling filling--${getNameFromPath(
                        ingredient.image
                      )}`"
                      >{{ ingredient.name }}</span
                    >

                    <base-item-counter
                      v-model="counter"
                      class="ingridients__counter"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <BaseInput
            v-model="name"
            name="pizza_name"
            placeholder="Введите название пиццы"
          >
            <span class="visually-hidden">Название пиццы</span>
          </BaseInput>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <BaseButton disabled> Готовьте! </BaseButton>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import { getNameFromPath } from "@/common/helpers.js";

import BaseButton from "@/common/components/BaseButton.vue";
import BaseInput from "@/common/components/BaseInput.vue";
import BaseItemCounter from "@/common/components/BaseItemCounter.vue";
import BaseRadioSelector from "@/common/components/BaseRadioSelector.vue";

export default {
  name: "IndexMain",

  components: {
    BaseButton,
    BaseInput,
    BaseItemCounter,
    BaseRadioSelector,
  },

  data() {
    return {
      dough: pizza.dough,
      ingredients: pizza.ingredients,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
      name: "",
      counter: 0,
      selectedDough: "light",
      selectedSize: "small",
    };
  },

  methods: {
    getDoughValue({ name }) {
      switch (name) {
        case "Тонкое":
          return "light";
        case "Толстое":
          return "large";
        default:
          return "large";
      }
    },

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

    getNameFromPath(path) {
      return getNameFromPath(path);
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
