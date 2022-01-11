<template>
  <el-table
    ref="tableSort"
    v-loading="isVuex && loading"
    :data="dataList"
    :height="tableHeight"
    :element-loading-text="dataLoadingText"
    style="width: 100%"
    empty-text="当前条件没有数据,可以试试其他的条件哦"
    @selection-change="onSelect"
  >
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  name: "ZTable",
  props: {
    dataLoadingText: {
      type: String,
      default: "正在加载中！",
    },
    tableHeight: {
      type: String,
      default: "100vh",
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    listLoading: {
      type: Boolean,
      default: false,
    },
    pageName: {
      type: String,
      default: "app",
    },
    isVuex: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    loading() {
      return this.isVuex
        ? this.$store.getters["ZStore/page"][this.pageName].loading
        : this.listLoading;
    },
    dataList() {
      return this.isVuex
        ? this.$store.getters["ZStore/page"][this.pageName].dataList
        : this.list;
    },
  },
  created() {
    console.log("--->pageTable", this.pageName);
  },
  methods: {
    onSelect(data) {
      this.$emit("onSelect", data);
    },
  },
};
</script>

<style scoped></style>
