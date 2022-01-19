export default {
  namespaced: true,
  state: {
    page: {
      app: {
        dataList: [],
        loading: false,
        totalCount: 0,
        currentPage: 1,
      },
    },
  },
  getters: {
    app(state) {
      return state.page.app;
    },
    page(state) {
      return state.page;
    },
  },
  mutations: {
    createPage(state, data) {
      state.page = {
        ...state.page,
        [data]: {
          dataList: [],
          loading: true,
          totalCount: 0,
          currentPage: 1,
        },
      };
    },
    setLoading(state, data) {
      state.page[data.pageName].loading = data.value;
    },
    setDataList(state, data) {
      state.page[data.pageName].dataList = data.value;
    },
    setTotalCount(state, data) {
      state.page[data.pageName].totalCount = data.value;
    },
    setCurrentPage(state, data) {
      state.page[data.pageName].currentPage = data.value;
    },
  },
};
