import {
  SET_ENTITY,
  DELETE_ENTITY,
  RESET_CART,
  ADD_ENTITY,
  UPDATE_MISC,
} from "@/store/mutations-types";

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
      // Костыль, так как приходят кривые данные с бэкенда (filter)
      commit(
        SET_ENTITY,
        {
          module: "Orders",
          entity: "orders",
          value: orders.filter((el) => el.orderPizzas),
        },
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

    async repeatOrder({ commit }, order) {
      const { orderPizzas, orderMisc } = order;

      commit(`Cart/${RESET_CART}`, null, { root: true });

      orderPizzas.forEach((pizza) => {
        commit(
          ADD_ENTITY,
          {
            module: "Cart",
            entity: "pizzas",
            value: pizza,
          },
          { root: true }
        );
      });

      if (orderMisc.length) {
        orderMisc.forEach(({ miscId, quantity }) => {
          commit(`Cart/${UPDATE_MISC}`, { miscId, quantity }, { root: true });
        });
      }
    },
  },
};
