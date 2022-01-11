import Page from "./Page";
import store from "@/store";

export default class List extends Page {
  constructor(
    formData,
    search,
    searchType = "request",
    afterSearch = () => {}
  ) {
    formData.zgyPageName &&
      store.commit("ZStore/createPage", formData.zgyPageName);
    super(formData, search, searchType);
    this.afterSearch = afterSearch;
  }
  onSearch(page = 1, refresh = false) {
    return new Promise((resolve) => {
      store.commit("ZStore/setLoading", {
        pageName: this.zgyPageName,
        value: true,
      });
      super.onSearch(page, refresh).then((res) => {
        store.commit("ZStore/setTotalCount", {
          pageName: this.zgyPageName,
          value: res.totalCount,
        });
        store.commit("ZStore/setDataList", {
          pageName: this.zgyPageName,
          value: res.data,
        });
        store.commit("ZStore/setCurrentPage", {
          pageName: this.zgyPageName,
          value: page,
        });
        this.afterSearch(res);
        resolve(res);
        setTimeout(() => {
          store.commit("ZStore/setLoading", {
            pageName: this.zgyPageName,
            value: false,
          });
        }, 300);
      });
    });
  }
}
