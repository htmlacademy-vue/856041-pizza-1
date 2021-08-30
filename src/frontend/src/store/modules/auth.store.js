import { SET_ENTITY, DELETE_ENTITY, ADD_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: () => ({
    error: null,
    user: null,
    addresses: [],
  }),

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
  },

  actions: {
    async login({ commit, dispatch }, payload) {
      commit(DELETE_ENTITY, { entity: "error" });
      try {
        const { token } = await this.$api.auth.login(payload);

        this.$jwt.saveToken(token);
        await dispatch("setUser");
      } catch (error) {
        commit(SET_ENTITY, {
          entity: "error",
          value:
            error?.response?.data?.error?.message ||
            "Что-то пошло не так. Попробуйте ещё раз!",
        });
        throw new Error();
      }
    },

    async setUser({ commit, dispatch }) {
      try {
        await this.$api.auth.setAuthHeader();
        const user = await this.$api.auth.getMe();
        commit(SET_ENTITY, { entity: "user", value: user });
        dispatch("loadAddresses");
      } catch (error) {
        this.$jwt.deleteToken();
      }
    },

    async logout({ commit }) {
      await this.$api.auth.logout();
      this.$jwt.deleteToken();
      commit(DELETE_ENTITY, { entity: "user" });
    },

    async loadAddresses({ commit }) {
      const addresses = await this.$api.addresses.get();
      commit(SET_ENTITY, { entity: "addresses", value: addresses });
    },

    async addAddress({ commit }, payload) {
      const result = await this.$api.addresses.post(payload);
      commit(ADD_ENTITY, { entity: "addresses", value: result });
    },
  },
};
