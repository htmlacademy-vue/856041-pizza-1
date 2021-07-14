import pizza from "@/static/pizza.json";
import {
  prepareDoughs,
  prepareIngredients,
  prepareSauces,
  prepareSizes,
} from "@/common/helpers.js";

import {
  SET_BUILDER_DATA,
  RESET_PIZZA,
  UPDATE_PIZZA_INGREDIENT,
  SET_PIZZA_PARAM,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: () => ({
    data: {},
    pizza: {
      dough: null,
      ingredients: [],
      name: "",
      sauce: null,
      size: null,
    },
  }),

  getters: {
    filledIngredients: (state) => {
      return state.pizza.ingredients.filter((el) => el.count > 0);
    },

    pizzaPrice: (state) => {
      const { pizza } = state;

      if (!pizza.dough || !pizza.sauce || !pizza.size) return 0;

      const ingredientsPrice = pizza.ingredients.reduce(
        (sum, { price, count }) => {
          return sum + price * count;
        },
        0
      );

      return (
        (ingredientsPrice + pizza.dough.price + pizza.sauce.price) *
        pizza.size.multiplier
      );
    },

    isPizzaReady: (state, getters) => {
      return !!getters.filledIngredients.length && !!state.pizza.name;
    },
  },

  mutations: {
    [SET_BUILDER_DATA](state, payload) {
      state.data = payload;
    },

    [RESET_PIZZA](state) {
      state.pizza.dough = state.data.doughs?.[0] ?? null;
      state.pizza.size = state.data.sizes?.[0] ?? null;
      state.pizza.sauce = state.data.sauces?.[0] ?? null;
      state.pizza.ingredients = [...state.data.ingredients];
      state.pizza.name = "";
    },

    [UPDATE_PIZZA_INGREDIENT](state, { name, type }) {
      const index = state.pizza.ingredients.findIndex((el) => el.name === name);

      if (~index) {
        const item = { ...state.pizza.ingredients[index] };

        switch (type) {
          case "increment":
            item.count = item.count + 1;
            break;
          case "decrement":
            item.count = item.count - 1;
            break;
        }

        state.pizza.ingredients.splice(index, 1, item);
      }
    },

    [SET_PIZZA_PARAM](state, { param, value }) {
      state.pizza[param] = value;
    },
  },

  actions: {
    query({ commit }) {
      // Первоначальный запрос всех компонентов пиццы (сейчас json)
      // TODO: Запросы на каждые данные
      const data = {
        sauces: prepareSauces(pizza.sauces),
        sizes: prepareSizes(pizza.sizes),
        doughs: prepareDoughs(pizza.dough),
        ingredients: prepareIngredients(pizza.ingredients),
      };

      commit(SET_BUILDER_DATA, data);

      // После загрузки всех данных сбрасываем состояние текущей пиццы к дефолтному
      commit(RESET_PIZZA);
    },
  },
};
