import {
  SET_DELIVERY_PARAM,
  ADD_ENTITY,
  RESET_CART,
} from "@/store/mutations-types";
import { prepareAdditionals } from "@/common/helpers";

import misc from "@/static/misc.json";

export default {
  namespaced: true,

  state: () => ({
    pizzas: [],
    additional: [],
    delivery: {
      type: "pickup",
      phone: "",
      street: "",
      house: "",
      flat: "",
    },
  }),

  getters: {
    isCartEmpty: (state) => {
      return state.pizzas.length === 0;
    },

    getTotalPrice: (state) => {
      const additionalPrice = state.additional.reduce(
        (sum, { price, count }) => {
          return sum + price * count;
        },
        0
      );

      const pizzasPrice = state.pizzas.reduce((sum, { price, count }) => {
        return sum + price * count;
      }, 0);

      return additionalPrice + pizzasPrice;
    },
  },

  mutations: {
    [SET_DELIVERY_PARAM](state, { param, value }) {
      state.delivery[param] = value;
    },

    [RESET_CART](state) {
      state.pizzas = [];
      state.delivery = {
        type: "pickup",
        phone: "",
        street: "",
        house: "",
        flat: "",
      };
      state.additional = state.additional.map((el) => ({ ...el, count: 0 }));
    },
  },

  actions: {
    query({ commit }) {
      const additionals = prepareAdditionals(misc);

      additionals.forEach((el) => {
        commit(
          ADD_ENTITY,
          {
            module: "Cart",
            entity: "additional",
            value: el,
          },
          { root: true }
        );
      });
    },
  },
};
