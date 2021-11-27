import {
  SET_DELIVERY_PARAM,
  ADD_ENTITY,
  RESET_CART,
  RESET_DELIVERY,
  ADD_MISC,
  UPDATE_MISC,
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
    misc: [],
  }),

  getters: {
    isCartEmpty: (state) => {
      return state.pizzas.length === 0;
    },

    getTotalPrice: (state, getters, rootState, rootGetters) => {
      const additionalPrice = state.misc.reduce((sum, { miscId, quantity }) => {
        const { price } = rootGetters.getMiscByID(miscId);
        return sum + price * quantity;
      }, 0);

      const pizzasPrice = state.pizzas.reduce((sum, pizza) => {
        const price = rootGetters.getPizzaPrice(pizza);
        return sum + price * pizza.quantity;
      }, 0);

      return additionalPrice + pizzasPrice;
    },

    getCartMiscById: (state) => (id) => {
      const misc = state.misc.find(({ miscId }) => miscId === id);
      return misc;
    },

    formattedPizzas: (state) => {
      const prepareIngredients = (pizza) => {
        const ingredients = pizza.ingredients.map((ing) => {
          return {
            ingredientId: ing.id,
            quantity: ing.quantity,
          };
        });
        return ingredients;
      };

      const preparePizza = (pizza) => {
        return {
          ...pizza,
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
      state.additional = state.additional.map((el) => ({ ...el, quantity: 0 }));
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

    [ADD_MISC](state, miscId) {
      state.misc.push({ miscId, quantity: 1 });
    },

    [UPDATE_MISC](state, misc) {
      const { miscId } = misc;
      const index = state.misc.findIndex(({ miscId: id }) => id === miscId);
      if (~index) {
        state.misc.splice(index, 1, misc);
      }
    },
  },

  actions: {
    async query({ commit, dispatch, state, rootState }) {
      if (rootState.Auth.user?.id) {
        await dispatch("Auth/loadAddresses", null, { root: true });
      }

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
        misc: state.misc,
      };

      await this.$api.orders.post(order);
      commit(RESET_DELIVERY);
      commit(RESET_CART);
    },
  },
};
