export default class Page {
  constructor(formData, search, searchType = "request") {
    this.formData = formData;
    this.zgyPageName = this.formData.zgyPageName ?? "app";
    this.page = 1;
    this.pagesize = this.formData.pagesize ? this.formData.pagesize : 10;
    this.defaultFormData = { ...this.formData };
    this.search = search;
    this.searchType = searchType;
    this.tempList = [];
    this.onSearch();
  }

  //重置搜索api
  changeSearch(search) {
    this.search = search;
  }

  //重置
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

  //搜索
  onSearch(page = 1) {
    this.page = page;
    return new Promise((resolve, reject) => {
      if (this.searchType === "request" || this.tempList.length === 0) {
        this.fetch()
          .then((res) => {
            resolve(res);
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
        resolve(result);
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
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      }
    });
  }

  //服务搜索
  fetch() {
    return new Promise((resolve, reject) => {
      this.search({
        ...this.formData,
        page: this.page,
        pagesize: this.pagesize,
        // 兼容pageSize
        pageSize: this.pagesize,
      })
        .then((res) => {
          let result = {};
          if (res instanceof Array) {
            result.totalCount = res.length;
            result.data = res;
            this.tempList = res;
          } else if (res instanceof Object) {
            this.tempList = res.data;
            result = { ...res };
          }
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  //本地搜索
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

  // 更改一页条数
  onchangePageSize = (size) => {
    this.pagesize = size;
    this.onSearch();
  };

  //更改页码
  onChangePage = (page) => {
    this.page = page;
    this.onSearch(this.page);
  };
}
