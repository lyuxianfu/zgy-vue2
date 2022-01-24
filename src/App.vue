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
        <el-form-item>
          <el-button @click="list.onRefresh()">刷新</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <ZTab
      :tabs="[{ title: '一楼' }, { title: '二楼' }]"
      @handleTab="handleTab"
    ></ZTab>
    <el-main>
      <ZTable table-height="calc(100vh - 260px)" page-name="test">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="性别" prop="sex"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="">
            <el-button @click="visible = true">查看</el-button>
          </template>
        </el-table-column>
      </ZTable>
    </el-main>
    <ZPagination
      page-name="test"
      @onChangePageSize="list.onChangePageSize"
      @onChangePage="list.onChangePage"
    ></ZPagination>
    <ZDialog
      title="修改"
      width="500px"
      :dialog-visible="visible"
      @onClose="visible = false"
      @onConfirm="visible = false"
    >
      <el-form
        ref="changeForm"
        label-position="left"
        label-width="160px"
        style="margin-left: 45px"
      >
        <el-form-item label="工时" prop="paytimes">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="工资" prop="paymoney">
          <el-input v-model="formData.age"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
      </el-form>
    </ZDialog>
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
      visible: false,
      sex: [
        { type: 0, label: "全部" },
        { type: 1, label: "男" },
        { type: 2, label: "女" },
      ],
      formData: {
        zgyPageName: "test",
        name: "",
        age: "",
        sex: "",
      },
      list: null,
    };
  },
  created() {
    this.list = new List(this.formData, fetch, "local", () => {
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

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
