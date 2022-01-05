<template>
  <el-table
    ref="tableSort"
    v-loading="loading"
    :data="list.length !== 0 ? list : dataList"
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
import setting from "@/utils/setting";
import store from "@/store";
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
  },
  computed: {
    loading: () => {
      return store.getters[setting.loading];
    },
    dataList: () => {
      return store.getters[setting.dataList];
    },
  },
  methods: {
    onSelect(data) {
      this.$emit("onSelect", data);
    },
  },
};
</script>

<style scoped></style>
