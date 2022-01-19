<template>
  <el-descriptions style="margin: 0 0 8px 0" :column="column" border>
    <el-descriptions-item v-for="(item, index) in options" :key="index">
      <template slot="label">{{ item.title }}</template>
      <div v-html="item.desc"></div>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  name: "ZDescriptions",
  props: {
    column: {
      type: Number,
      default: 2,
    },
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style scoped></style>
