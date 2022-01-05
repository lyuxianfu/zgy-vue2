export const ZStore = {
  state: {
    totalCount: 0,
    dataList: [],
    loading: false,
  },
  getters: {
    totalCount(state) {
      return state.totalCount;
    },
    dataList(state) {
      return state.dataList;
    },
    loading(state) {
      return state.loading;
    },
  },
  mutations: {
    setTotalCount(state, data) {
      state.totalCount = data;
    },
    setDataList(state, data) {
      state.dataList = data;
    },
    setLoading(state, data) {
      state.loading = data;
    },
  },
};
