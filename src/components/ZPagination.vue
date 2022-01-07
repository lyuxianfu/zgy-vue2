<template>
  <el-pagination
    style="text-align: right"
    :total="total"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="defautlPageSize"
    :current-page="currentPage"
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
      default: "app",
    },
    defautlPageSize: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    currentPage() {
      return this.$store.getters["ZStore/page"][this.pageName].currentPage;
    },
    total() {
      return this.$store.getters["ZStore/page"][this.pageName].totalCount;
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
