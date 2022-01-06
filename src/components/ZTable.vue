<template>
  <el-table
    ref="tableSort"
    v-loading="$store.getters.page[pageName].loading"
    :data="$store.getters.page[pageName].dataList"
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
    pageName: {
      type: String,
      default: "app",
    },
  },
  created() {
    console.log(this.pageName);
  },
  methods: {
    onSelect(data) {
      this.$emit("onSelect", data);
    },
  },
};
</script>

<style scoped></style>
