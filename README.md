# zgy-vue2

##介绍
```
建立在element-ui基础上的业务组件，并不是适用所有状况

配置了3个模块: vuex、components、List

emmmm~~~~ 其实是解决很多界面都是列表界面（条件搜索， 列表， 页码等）重复写的麻烦事

使用的话 npm install zgy-vue2 

or      yarn add zgy-vue2

当然，此前我需要安装elmenet-ui
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Vuex
```
其实只要在store中加载下相关文件，只是单纯的一个modules

import zgyVue2 form 'zgy-vue2'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ZStore: zgyVue2.store,
  },
});
```

### List
```
List继承Page,也在模块了，如果有问题可以自己重新封装相关，不一定适用

class List

@params formData[Object] 发起请求的参数
@params search[Function] 请求参数（是一个请求，需要是一个Promise）
               返回： data【Array】 展示的列表
                     totalCount 【String || Number】 数据总条数
                     还有其他的可以随便传
              example: 
              const fecth = () =>{
                return New Promise((resove, reject)=>{
                    ...
                    resove({
                      data: [...],
                      totalCount: 100  
                    })
                    ...
                    reject(err)
                })
              }
@params searchType[String] 搜索方式 【’request‘, 'local', 其他】
                   requset: 单纯的服务请求
                   local: 单纯的本地处理
                   其他： 可以传array或者string
                         array: 遍历数组中的参数，去返回对应的数据
                         string: 寻找一个参数，去返回对应的数据
@params afterSearch[Function] 完成请求之后处理的数据

@example  
        
        import zgyVue2 from 'zgy-vue2'
        import {fecth} from '@/api'
        ...
            this.list = new List(this.formData, fecth, 'request', (res)=>{
                ......
            })
        ...

@function changeSearch 可能会有切换或者其他什么情况，突然接口需要换，那么这个会有帮助
           this.list.changeSearch(你的接口方法)
           
@function onReset 重置，所有搜索条件重置到默认，并恢复第一次请求（不过没有重置你之前的接口方法）

@function onSearch 搜索

@function onchangePageSize 一页数量

@function onChangePage 更改当前页

```

### components
```
目前只有3个组件封装了，其他的以后再说把
ZTable,ZTab,ZPagination
```

### example一个最简单的界面

```
<template>
  <el-container>
    <el-header>
      <el-form :inline="true">
        <el-form-item>
          <el-select v-model="formData.sex">
            <el-option
              v-for="(item, index) in sex"
              :label="item.label"
              :value="item.type"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.age" placeholder="年龄"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="list.onSearch()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="list.onReset()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <ZTab
      :tabs="[{ title: '一楼' }, { title: '二楼' }]"
      @handleTab="handleTab"
    ></ZTab>
    <el-main>
      <ZTable table-height="calc(100vh - 260px)">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
      </ZTable>
    </el-main>
    <Zpagination
      @onChangePageSize="list.onchangePageSize"
      @onChangePage="list.onChangePage"
    ></Zpagination>
  </el-container>
</template>

<script>
import List from "@/./utils/List";
import { fetch } from "@/api";
export default {
  name: "App",
  components: {},

  data() {
    return {
      sex: [
        { type: 0, label: "全部" },
        { type: 1, label: "男" },
        { type: 2, label: "女" },
      ],
      formData: {
        name: "",
        age: "",
        sex: "",
      },
      list: null,
    };
  },
  created() {
    this.list = new List(this.formData, fetch, "request", () => {
      console.log(this.$store.getters["ZStore/page"]);
    });
  },
  methods: {
    handleTab(tab) {
      console.log(tab);
      this.list.onSearch();
    },
  },
};
</script>

```


