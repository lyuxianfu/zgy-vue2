// import Page from "@/utils/Page";
import zgy from "../../index";
import store from "@/store";

export default class List extends zgy.Page {
  constructor(
    formData,
    search,
    searchType = "request",
    afterSearch = () => {}
  ) {
    formData.pageName && store.commit("createPage", formData.pageName);
    super(formData, search, searchType);
    this.afterSearch = afterSearch;
  }
  onSearch() {
    return new Promise((resolve) => {
      store.commit("setLoading", { pageName: this.pageName, value: true });
      super.onSearch().then((res) => {
        store.commit("setTotalCount", {
          pageName: this.pageName,
          value: res.totalCount,
        });
        store.commit("setDataList", {
          pageName: this.pageName,
          value: res.data,
        });
        this.afterSearch(res);
        resolve(res);
        setTimeout(() => {
          store.commit("setLoading", { pageName: this.pageName, value: false });
        }, 500);
      });
    });
  }
}
