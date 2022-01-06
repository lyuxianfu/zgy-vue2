export const ZStore = {
  state: {
    page: {
      app: {
        dataList: [],
        loading: false,
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
      state.page[data] = {
        dataList: [],
        loading: true,
        totalCount: 0,
      };
    },
    setLoading(state, data) {
      console.log("--->");
      console.log(state, data);
      state.page[data.pageName].loading = data.value;
    },
    setDataList(state, data) {
      state.page[data.pageName].dataList = data.value;
    },
    setTotalCount(state, data) {
      state.page[data.pageName].totalCount = data.value;
    },
  },
};
