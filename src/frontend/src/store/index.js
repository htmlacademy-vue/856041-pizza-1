import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "@/plugins/vuexPlugins";
import modules from "@/store/modules";
import {
  SET_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
  DELETE_ENTITY,
} from "@/store/mutations-types";

Vue.use(Vuex);

const state = () => ({});

const getters = {
  getIngredientByID: (state, getters, rootState) => (id, quantity) => {
    const { ingredients } = rootState.Builder.data;
    const ingredient = ingredients.find((ingredient) => id === ingredient.id);
    return {
      ...ingredient,
      quantity,
    };
  },

  getSauceByID: (state, getters, rootState) => (id) => {
    const { sauces } = rootState.Builder.data;
    return sauces.find((sauce) => id === sauce.id);
  },

  getSizeByID: (state, getters, rootState) => (id) => {
    const { sizes } = rootState.Builder.data;
    return sizes.find((size) => id === size.id);
  },

  getDoughByID: (state, getters, rootState) => (id) => {
    const { doughs } = rootState.Builder.data;
    return doughs.find((dough) => id === dough.id);
  },

  getMiscByID: (state, getters, rootState) => (id) => {
    const { additional } = rootState.Cart;
    return additional.find((misc) => id === misc.id);
  },

  getFormattedPizza:
    (state, getters) =>
    ({ doughId, sizeId, sauceId, name, quantity, ingredients }) => {
      return {
        dough: getters.getDoughByID(doughId),
        ingredients: ingredients.map(({ id, quantity }) =>
          getters.getIngredientByID(id, quantity)
        ),
        size: getters.getSizeByID(sizeId),
        sauce: getters.getSauceByID(sauceId),
        name,
        quantity,
      };
    },

  getPizzaPrice: (state, getters) => (pizza) => {
    const { ingredients, size, sauce, dough } =
      getters.getFormattedPizza(pizza);

    const ingredientsPrice = ingredients.reduce((sum, { price, quantity }) => {
      return sum + price * quantity;
    }, 0);

    return (ingredientsPrice + dough.price + sauce.price) * size.multiplier;
  },
};

const mutations = {
  [SET_ENTITY](state, { module, entity, value }) {
    module ? (state[module][entity] = value) : (state[entity] = value);
  },

  [ADD_ENTITY](state, { module, entity, value }) {
    if (module) {
      state[module][entity] = [...state[module][entity], value];
    } else {
      state[entity] = [...state[entity], value];
    }
  },

  [UPDATE_ENTITY](state, { module, entity, value }) {
    if (module) {
      const index = state[module][entity].findIndex(
        ({ id }) => id === value.id
      );
      if (~index) {
        state[module][entity].splice(index, 1, value);
      }
    } else {
      const index = state[entity].findIndex(({ id }) => id === value.id);
      if (~index) {
        state[entity].splice(index, 1, value);
      }
    }
  },

  [DELETE_ENTITY](state, { module, entity, id }) {
    if (module) {
      state[module][entity] = state[module][entity].filter(
        (e) => +e.id !== +id
      );
    } else {
      state[entity] = state[entity].filter((e) => +e.id !== +id);
    }
  },
};

const actions = {
  async init({ dispatch }) {
    await dispatch("Builder/query");
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules,
  plugins: [VuexPlugins],
});
