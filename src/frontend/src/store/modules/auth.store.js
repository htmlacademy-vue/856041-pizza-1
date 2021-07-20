import { SET_ENTITY, DELETE_ENTITY } from "@/store/mutations-types";

export default {
  namespaced: true,

  state: () => ({
    error: null,
    user: null,
  }),

  mutations: {
    [SET_ENTITY](state, { entity, value }) {
      state[entity] = value;
    },

    [DELETE_ENTITY](state, { entity }) {
      state[entity] = null;
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

    async setUser({ commit }) {
      try {
        this.$api.auth.setAuthHeader();
        const user = await this.$api.auth.getMe();
        commit(SET_ENTITY, { entity: "user", value: user });
      } catch (error) {
        this.$jwt.deleteToken();
      }
    },

    async logout({ commit }) {
      await this.$api.auth.logout();
      this.$jwt.deleteToken();
      commit(DELETE_ENTITY, { entity: "user" });
    },
  },
};
