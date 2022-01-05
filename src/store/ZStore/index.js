export const ZStore = {
  state: {
    test: [],
  },
  getters: {
    test(state) {
      return state.test;
    },
  },
  mutations: {
    setTest(state, data) {
      state.test = data;
    },
  },
  actions: {
    setTestSync({ commit }, data) {
      commit("setTest", data);
    },
  },
};
