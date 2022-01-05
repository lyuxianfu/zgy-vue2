<template>
  <el-pagination
    style="text-align: right"
    :total="totalCount"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="defautlPageSize"
    layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  ></el-pagination>
</template>

<script>
import setting from "@/utils/setting";
import store from "@/store";
export default {
  name: "Zpagination",
  props: {
    defautlPageSize: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    totalCount() {
      return store.getters[setting.totalCount];
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
