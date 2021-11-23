import { SET_ENTITY, DELETE_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: () => ({
    orders: [],
  }),

  getters: {
    getOrderPrice:
      (state, getters, rootState, rootGetters) =>
      ({ orderMisc, orderPizzas }) => {
        const miscPrice = orderMisc
          ? orderMisc.reduce((price, { miscId, quantity }) => {
              const formattedMisc = rootGetters.getMiscByID(miscId);
              return price + formattedMisc.price * quantity;
            }, 0)
          : 0;

        const pizzasPrice = orderPizzas.reduce((price, pizza) => {
          return price + rootGetters.getPizzaPrice(pizza);
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
