import {
  SET_DELIVERY_PARAM,
  ADD_ENTITY,
  RESET_CART,
  RESET_DELIVERY,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: () => ({
    pizzas: [],
    additional: [],
    delivery: {
      type: "pickup",
      phone: "",
      street: "",
      building: "",
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

    formattedMisc: (state) => {
      const misc = state.additional.filter((el) => el.count > 0);
      return misc.map((el) => {
        return {
          miscId: el.id,
          quantity: el.count,
        };
      });
    },

    formattedPizzas: (state) => {
      const prepareIngredients = (pizza) => {
        const ingredients = pizza.ingredients.filter((el) => el.count > 0);
        return ingredients.map((ing) => {
          return {
            ingredientId: ing.id,
            quantity: ing.count,
          };
        });
      };

      const preparePizza = (pizza) => {
        return {
          name: pizza.name,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
          quantity: pizza.count,
          ingredients: prepareIngredients(pizza),
        };
      };

      return state.pizzas.map((el) => preparePizza(el));
    },

    formattedAddress: (state) => {
      const { type, id, street, building, flat } = state.delivery;
      if (type === "address") {
        return {
          id,
        };
      } else if (type === "delivery") {
        return {
          street,
          building,
          flat,
        };
      } else {
        return null;
      }
    },
  },

  mutations: {
    [SET_DELIVERY_PARAM](state, { param, value }) {
      state.delivery[param] = value;
    },

    [RESET_CART](state) {
      state.pizzas = [];
      state.additional = state.additional.map((el) => ({ ...el, count: 0 }));
    },

    [RESET_DELIVERY](state) {
      state.delivery = {
        type: "delivery",
        phone: "",
        street: "",
        building: "",
        flat: "",
      };
    },
  },

  actions: {
    async query({ commit, state }) {
      if (state.additional.length > 0) return;

      const additionals = await this.$api.misc.query();

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

    async createOrder({ commit, getters, state, rootState }) {
      let order = {
        userId: rootState.Auth.user?.id || null,
        phone: state.delivery.phone,
        address: getters.formattedAddress,
        pizzas: getters.formattedPizzas,
        misc: getters.formattedMisc,
      };

      await this.$api.orders.post(order);
      commit(RESET_DELIVERY);
      commit(RESET_CART);
    },
  },
};
