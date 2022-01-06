<template>
  <el-pagination
    style="text-align: right"
    :total="$store.getters.page[pageName].totalCount"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="defautlPageSize"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script>
export default {
  name: "Zpagination",
  props: {
    pageName: {
      type: String,
      default: "",
    },
    defautlPageSize: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    handleSizeChange(size) {
      this.$emit("onChangePageSize", size);
    },
    handleCurrentChange(current) {
      this.$emit("onChangePage", current);
    },
  },
};
</script>

<style scoped></style>
