<template>
  <el-tabs v-model="value" type="card" @tab-click="handleTab">
    <el-tab-pane
      v-for="(item, index) in tabs"
      :key="index"
      :label="item.title + (item.count ? '·' + item.count : '')"
      :name="item.value"
    ></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "ZTab",
  props: {
    tabs: {
      type: Array,
      default: () => {
        return [];
      },
    },
    activeName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: this.activeName,
    };
  },
  watch: {
    activeName(value) {
      this.value = value;
    },
  },
  methods: {
    handleTab() {
      this.$emit("handleTab", this.value);
    },
  },
};
</script>

<style scoped></style>
