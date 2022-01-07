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
      console.log("--->createPage", data);
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
      console.log("--->setLoading", data.pageName, data.value);
      state.page[data.pageName].loading = data.value;
    },
    setDataList(state, data) {
      console.log("--->setDataList", data.pageName, data.value);
      state.page[data.pageName].dataList = data.value;
    },
    setTotalCount(state, data) {
      console.log("--->setTotalCount", data.pageName, data.value);
      state.page[data.pageName].totalCount = data.value;
    },
    setCurrentPage(state, data) {
      console.log("--->setCurrentPage", data.pageName, data.value);
      state.page[data.pageName].currentPage = data.value;
    },
  },
};
