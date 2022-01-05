import store from "@/store";
import setting from "@/utils/setting";

export default class List {
  constructor(
    formData,
    search,
    searchType = "request",
    afterSearch = () => {}
  ) {
    this.formData = formData;
    this.page = 1;
    this.pagesize = this.formData.pagesize ? this.formData.pagesize : 10;
    this.defaultFormData = { ...this.formData };
    this.search = search;
    this.searchType = searchType;
    this.tempList = [];
    this.afterSearch = afterSearch;
    this.onSearch();
  }
  changeSearch(search) {
    this.search = search;
  }
  onReset(noResetParam) {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(this.formData);
      this.page = 1;
      this.pagesize = 10;
      let noResetKey = [];
      if (noResetParam instanceof Array) {
        noResetKey = [...noResetParam];
      } else if (noResetParam instanceof String) {
        noResetKey.push(noResetParam);
      }
      keys.forEach((key) => {
        let reset = true;
        noResetKey.map((item) => {
          if (item === key) {
            reset = false;
          }
        });
        if (reset) {
          this.formData[key] = this.defaultFormData[key];
        }
      });
      this.onSearch()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  onSearch() {
    return new Promise((resolve, reject) => {
      if (this.searchType === "request" || this.tempList.length === 0) {
        this.fetch()
          .then((res) => {
            resolve(res);
            store.commit(setting.setTotalCount, res.totalCount);
            store.commit(setting.setDataList, res.data);
            this.afterSearch(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else if (this.searchType === "local") {
        const keys = Object.keys(this.formData);
        let list = this.tempList;
        keys.map((key) => {
          list = this.getLocalListByKey(list, key);
        });
        const result = {
          totalCount: list.length,
          data: list,
        };
        this.afterSearch(result);
        resolve(result);
        store.commit(setting.setTotalCount, result.totalCount);
        store.commit(setting.setDataList, list);
      } else {
        this.fetch()
          .then((res) => {
            let keys = [];
            if (this.searchType instanceof Array) {
              keys = this.searchType;
            } else {
              keys = [this.searchType];
            }
            let list = this.tempList;
            keys.map((key) => {
              list = this.getLocalListByKey(list, key);
            });
            res.totalCount = list.length;
            res.data = list;
            this.afterSearch(res);
            resolve(res);
            store.commit(setting.setTotalCount, res.totalCount);
            store.commit(setting.setDataList, res.data);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }
  fetch() {
    return new Promise((resolve, reject) => {
      store.commit(setting.setLoading, true);
      this.search({
        ...this.formData,
        page: this.page,
        pagesize: this.pagesize,
        // 兼容pageSize
        pageSize: this.pagesize,
      })
        .then((res) => {
          let data = [];
          let result = {};
          if (res instanceof Array) {
            result.totalCount = res.length;
            result.data = res;
            if (data) {
              this.tempList = res;
            }
          } else if (res instanceof Object) {
            data = res.data;
            if (res.data) {
              this.tempList = data;
            }
            result = { ...res };
          }
          setTimeout(() => {
            store.commit(setting.setLoading, false);
          }, 500);
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  getLocalListByKey(list, key) {
    const newList = [];
    if (!this.formData[key] || this.formData[key] === "") return list;
    list.map((item) => {
      if (item[key].indexOf(this.formData[key]) > -1) {
        newList.push(item);
      }
    });
    return newList;
  }
  onchangePageSize = (size) => {
    this.pagesize = size;
    this.onSearch();
  };
  onChangePage = (page) => {
    this.page = page;
    this.onSearch();
  };
}
