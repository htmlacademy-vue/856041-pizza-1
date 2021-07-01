<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="(el, index) in dough"
                :key="index"
                class="dough__input"
                :class="` dough__input--${getDoughValue(el)}`"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="getDoughValue(el)"
                  class="visually-hidden"
                />
                <b>{{ el.name }}</b>
                <span>{{ el.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="size in sizes"
                :key="size.multiplier"
                class="diameter__input"
                :class="`diameter__input--${getSizesValue(size)}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="getSizesValue(size)"
                  class="visually-hidden"
                />
                <span>{{ size.name }}</span>
              </label>
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

                    <div class="counter counter--orange ingridients__counter">
                      <button
                        type="button"
                        class="
                          counter__button
                          counter__button--disabled
                          counter__button--minus
                        "
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

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
            <button type="button" class="button button--disabled" disabled>
              Готовьте!
            </button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "@/static/pizza.json";
import { getNameFromPath } from "@/common/helpers.js";

export default {
  name: "IndexMain",

  data() {
    return {
      dough: pizza.dough,
      ingredients: pizza.ingredients,
      sauces: pizza.sauces,
      sizes: pizza.sizes,
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
  },
};
</script>
