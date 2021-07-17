import { SET_DELIVERY_PARAM } from "@/store/mutations-types";

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
      const additionalPrice = 0;

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
  },
};
