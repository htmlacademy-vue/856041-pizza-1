import { SET_ENTITY, DELETE_ENTITY } from "@/store/mutations-types";
import { RESET_CART, ADD_ENTITY } from "@/store/mutations-types";
// import { UPDATE_ENTITY } from "@/store/mutations-types";

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
      const { orderPizzas } = order;

      commit(`Orders/${RESET_CART}`, { root: true });

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

      // TODO: Сделать заполнение ингридиентов правильно.
      // Убрать использование данных и каунтеров в одном месте
      // if (orderMisc.length) {
      //   orderMisc.forEach((el) => {
      //     const { miscId, quantity } = el;
      //     commit(
      //       UPDATE_ENTITY,
      //       {
      //         module: "Cart",
      //         entity: "additional",
      //         value: {
      //           id: miscId,
      //           quantity,
      //         },
      //       },
      //       { root: true }
      //     );
      //   });
      // }
    },
  },
};
