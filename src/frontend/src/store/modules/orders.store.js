import {
  SET_ENTITY,
  DELETE_ENTITY,
  ADD_ENTITY,
  UPDATE_ENTITY,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: () => ({
    orders: [],
  }),

  getters: {
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
  },

  mutations: {
    [SET_ENTITY](state, { entity, value }) {
      state[entity] = value;
    },

    [DELETE_ENTITY](state, { entity }) {
      state[entity] = null;
    },

    [ADD_ENTITY](state, { entity, value }) {
      state[entity] = [...state[entity], value];
    },

    [UPDATE_ENTITY](state, { entity, value }) {
      const index = state[entity].findIndex(({ id }) => id === value.id);
      if (~index) {
        state[entity].splice(index, 1, value);
      }
    },
  },

  actions: {
    async loadOrders({ commit }) {
      const orders = await this.$api.orders.get();
      commit(SET_ENTITY, { entity: "orders", value: orders });
    },
  },
};
