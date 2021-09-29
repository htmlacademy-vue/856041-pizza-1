import { SET_ENTITY, DELETE_ENTITY } from "@/store/mutations-types";

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

    getPizzaPrice: (state, getters) => (pizza) => {
      const { ingredients, size, sauce, dough } =
        getters.getFormattedPizza(pizza);

      const ingredientsPrice = ingredients.reduce(
        (sum, { price, quantity }) => {
          return sum + price * quantity;
        },
        0
      );

      return (ingredientsPrice + dough.price + sauce.price) * size.multiplier;
    },

    getOrderPrice:
      (state, getters) =>
      ({ orderMisc, orderPizzas }) => {
        const miscPrice = orderMisc
          ? orderMisc.reduce((price, { miscId, quantity }) => {
              const formattedMisc = getters.getMiscByID(miscId);
              return price + formattedMisc.price * quantity;
            }, 0)
          : 0;

        const pizzasPrice = orderPizzas.reduce((price, pizza) => {
          return price + getters.getPizzaPrice(pizza);
        }, 0);

        return miscPrice + pizzasPrice;
      },
  },

  actions: {
    async loadOrders({ commit }) {
      const orders = await this.$api.orders.get();
      commit(
        SET_ENTITY,
        { module: "Orders", entity: "orders", value: orders },
        { root: true }
      );
    },

    async deleteOrder({ commit }, id) {
      await this.$api.orders.delete(id);
      commit(
        DELETE_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          id,
        },
        { root: true }
      );
    },
  },
};
