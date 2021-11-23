import {
  SET_BUILDER_DATA,
  RESET_PIZZA,
  UPDATE_PIZZA_INGREDIENT,
  SET_PIZZA_PARAM,
  ADD_ENTITY,
  UPDATE_READY_PIZZA,
} from "@/store/mutations-types";

export default {
  namespaced: true,

  state: () => ({
    data: {},
    pizza: {
      dough: null,
      ingredients: [],
      name: "",
      sauce: null,
      size: null,
    },
  }),

  getters: {
    filledIngredients: (state) => {
      return state.pizza.ingredients.filter((el) => el.quantity > 0);
    },

    pizzaPrice: (state) => {
      const { pizza } = state;

      if (!pizza.dough || !pizza.sauce || !pizza.size) return 0;

      const ingredientsPrice = pizza.ingredients.reduce(
        (sum, { price, quantity }) => {
          return sum + price * quantity;
        },
        0
      );

      return (
        (ingredientsPrice + pizza.dough.price + pizza.sauce.price) *
        pizza.size.multiplier
      );
    },

    isPizzaReady: (state, getters) => {
      return !!getters.filledIngredients.length && !!state.pizza.name;
    },
  },

  mutations: {
    [SET_BUILDER_DATA](state, payload) {
      state.data = payload;
    },

    [RESET_PIZZA](state) {
      state.pizza.dough = state.data.doughs?.[0] ?? null;
      state.pizza.size = state.data.sizes?.[0] ?? null;
      state.pizza.sauce = state.data.sauces?.[0] ?? null;
      state.pizza.ingredients = [...state.data.ingredients];
      state.pizza.name = "";
    },

    [UPDATE_READY_PIZZA](state, { name, ingredients, sauce, size, dough }) {
      state.pizza.name = name;
      state.pizza.ingredients = ingredients;
      state.pizza.size = size;
      state.pizza.sauce = sauce;
      state.pizza.dough = dough;
    },

    [UPDATE_PIZZA_INGREDIENT](state, { name, type }) {
      const index = state.pizza.ingredients.findIndex((el) => el.name === name);

      if (~index) {
        const item = { ...state.pizza.ingredients[index] };

        switch (type) {
          case "increment":
            item.quantity = item.quantity + 1;
            break;
          case "decrement":
            item.quantity = item.quantity - 1;
            break;
        }

        state.pizza.ingredients.splice(index, 1, item);
      }
    },

    [SET_PIZZA_PARAM](state, { param, value }) {
      state.pizza[param] = value;
    },
  },

  actions: {
    async query({ commit }) {
      const sauces = await this.$api.sauce.query();
      const sizes = await this.$api.size.query();
      const doughs = await this.$api.dough.query();
      const ingredients = await this.$api.ingredient.query();

      const data = {
        sauces,
        sizes,
        doughs,
        ingredients,
      };

      commit(SET_BUILDER_DATA, data);

      // После загрузки всех данных сбрасываем состояние текущей пиццы к дефолтному
      commit(RESET_PIZZA);
    },

    post({ state, commit }) {
      // Добавление пиццы в корзину и обнуление полей
      const prepareIngredients = (pizza) => {
        const ingredients = pizza.ingredients.filter((el) => el.quantity > 0);
        return ingredients.map((ing) => {
          return {
            id: ing.id,
            quantity: ing.quantity,
          };
        });
      };

      const preparePizza = (pizza) => {
        return {
          name: pizza.name,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
          ingredients: prepareIngredients(pizza),
        };
      };

      const formattedPizza = preparePizza(state.pizza);

      commit(
        ADD_ENTITY,
        {
          module: "Cart",
          entity: "pizzas",
          value: {
            ...formattedPizza,
            quantity: 1,
          },
        },
        { root: true }
      );

      commit(RESET_PIZZA);
    },
  },
};
